import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import {
  CreateUserDto,
  UpdateUserDto,
  GetUsersQueryDto,
  GetUsersResponseDto,
  UserResponseDto,
  ChangePasswordDto,
} from '@app/dto';
import { Prisma } from '@app/prisma/generated/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly SALT_ROUNDS = 10;

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Tạo user mới
   */
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.SALT_ROUNDS,
    );

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return this.mapToUserResponse(user);
  }

  /**
   * Lấy danh sách users với pagination và filter
   */
  async findAll(query: GetUsersQueryDto): Promise<GetUsersResponseDto> {
    const {
      page = 1,
      limit = 20,
      role,
      status,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const where: Prisma.UserWhereInput = {
      ...(role && { role }),
      ...(status && { status }),
      ...(search && {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users.map((user) => this.mapToUserResponse(user)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Lấy user theo ID
   */
  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User với ID ${id} không tồn tại`);
    }

    return this.mapToUserResponse(user);
  }

  /**
   * Lấy user theo email (dùng cho authentication)
   */
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User với email ${email} không tồn tại`);
    }

    return user; // Trả về cả password để xác thực
  }

  /**
   * Cập nhật user
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    await this.findOne(id); // Kiểm tra user tồn tại

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return this.mapToUserResponse(user);
  }

  /**
   * Đổi password
   */
  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.findOne(id); // Kiểm tra user tồn tại

    const hashedPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      this.SALT_ROUNDS,
    );

    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return { message: 'Đổi password thành công' };
  }

  /**
   * Xóa user (soft delete bằng cách đổi status)
   */
  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id); // Kiểm tra user tồn tại

    await this.prisma.user.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });

    return { message: 'Xóa user thành công' };
  }

  /**
   * Xóa user vĩnh viễn (hard delete)
   */
  async hardRemove(id: string): Promise<{ message: string }> {
    await this.findOne(id); // Kiểm tra user tồn tại

    await this.prisma.user.delete({
      where: { id },
    });

    return { message: 'Xóa user vĩnh viễn thành công' };
  }

  /**
   * Map entity sang response DTO (loại bỏ password)
   */
  private mapToUserResponse(
    user: Prisma.UserGetPayload<object>,
  ): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      avatar: user.avatar,
      address: user.address,
      role: user.role,
      status: user.status,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
