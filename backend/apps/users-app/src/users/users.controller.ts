import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateUserPayloadDto,
  GetUsersQueryDto,
  ChangePasswordDto,
  USER_MESSAGE_PATTERNS,
} from '@app/dto';

@Controller()
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_MESSAGE_PATTERNS.CREATE)
  async create(@Payload() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error creating user: ${error.message}`);
        throw new RpcException(error.message);
      }
    }
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.FIND_ALL)
  async findAll(@Payload() query: GetUsersQueryDto) {
    try {
      return await this.usersService.findAll(query);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error finding users: ${error.message}`);
        throw new RpcException(error.message);
      }
    }
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.FIND_ONE)
  async findOne(@Payload() id: string) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error finding user ${id}: ${error.message}`);
        throw new RpcException(error.message);
      }
    }
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.FIND_BY_EMAIL)
  async findByEmail(@Payload() email: string) {
    try {
      return await this.usersService.findByEmail(email);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error finding user by email: ${error.message}`);
        throw new RpcException(error.message);
      }
    }
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.UPDATE)
  async update(@Payload() payload: UpdateUserPayloadDto) {
    try {
      const { id, ...updateData } = payload;
      return await this.usersService.update(id, updateData);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error updating user: ${error.message}`);
        throw new RpcException(error.message);
      }
    }
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.REMOVE)
  async remove(@Payload() id: string) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error removing user ${id}: ${error.message}`);
        throw new RpcException(error.message);
      }
    }
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.CHANGE_PASSWORD)
  async changePassword(
    @Payload() payload: { id: string; data: ChangePasswordDto },
  ) {
    try {
      return await this.usersService.changePassword(payload.id, payload.data);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error changing password: ${error.message}`);
        throw new RpcException(error.message);
      }
    }
  }
}
