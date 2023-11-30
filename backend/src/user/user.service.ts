import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(user: User) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOne(username: string): Promise<User | null> {
    return this.userModel.findOne({username}).exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
