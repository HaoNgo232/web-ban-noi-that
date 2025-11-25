import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
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
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USER_MESSAGE_PATTERNS.CREATE)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.FIND_ALL)
  findAll(@Payload() query: GetUsersQueryDto) {
    return this.usersService.findAll(query);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.usersService.findOne(id);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.FIND_BY_EMAIL)
  findByEmail(@Payload() email: string) {
    return this.usersService.findByEmail(email);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.UPDATE)
  update(@Payload() payload: UpdateUserPayloadDto) {
    const { id, ...updateData } = payload;
    return this.usersService.update(id, updateData);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.REMOVE)
  remove(@Payload() id: string) {
    return this.usersService.remove(id);
  }

  @MessagePattern(USER_MESSAGE_PATTERNS.CHANGE_PASSWORD)
  changePassword(@Payload() payload: { id: string; data: ChangePasswordDto }) {
    return this.usersService.changePassword(payload.id, payload.data);
  }
}
