import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  @GrpcMethod('UserService')
  getUser(data: { id: number }) {
    return { id: data.id, name: 'John Doe' };
  }
}
