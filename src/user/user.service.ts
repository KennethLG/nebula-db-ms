import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUser(id: string) {
    console.log('getting user', id);
    try {
      const user = await this.userModel.findOne({ _id: id }).exec();
      if (user) {
        const userObj = user.toJSON();
        const response = {
          id: userObj._id.toString(),
          name: userObj.name,
          email: userObj.email,
        };
        return response;
      }
      return null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createUser(data: { name: string; email: string }) {
    console.log('creating user', JSON.stringify(data));
    try {
      const user = new this.userModel(data);
      const savedUser = await user.save();
      return {
        id: savedUser._id.toString(),
        name: savedUser.name,
        email: savedUser.email,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
