import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BaseGatewayController } from '../base.controller';
import {
  CreateUserDto,
  UpdateUserDto,
  GetUsersQueryDto,
  USER_MESSAGE_PATTERNS,
} from '@app/dto';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController extends BaseGatewayController {
  constructor(@Inject('USERS_SERVICE') protected readonly client: ClientProxy) {
    super(client);
  }

  /**
   * Tạo user mới (admin/staff only)
   * POST /users
   */
  @Roles('admin', 'staff')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.send(USER_MESSAGE_PATTERNS.CREATE, createUserDto);
  }

  /**
   * Lấy danh sách users (admin/staff only)
   * GET /users
   */
  @Roles('admin', 'staff')
  @Get()
  findAll(@Query() query: GetUsersQueryDto) {
    return this.send(USER_MESSAGE_PATTERNS.FIND_ALL, query);
  }

  /**
   * Lấy user theo ID (authenticated)
   * GET /users/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.send(USER_MESSAGE_PATTERNS.FIND_ONE, id);
  }

  /**
   * Cập nhật user (admin/staff hoặc chính user đó)
   * PATCH /users/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.send(USER_MESSAGE_PATTERNS.UPDATE, { id, ...updateUserDto });
  }

  /**
   * Xóa user (admin only)
   * DELETE /users/:id
   */
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.send(USER_MESSAGE_PATTERNS.REMOVE, id);
  }
}
