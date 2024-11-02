import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(@Inject() private readonly userService: UserService) {}
  @GrpcMethod('UserService')
  async getUser(data: { id: string }) {
    const user = await this.userService.getUser(data.id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @GrpcMethod('UserService')
  async createUser(data: { name: string; email: string }) {
    const user = await this.userService.createUser(data);
    return user;
  }
}
