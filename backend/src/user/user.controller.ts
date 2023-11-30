import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post } from "@nestjs/common";
import { NewUserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { User } from "./interfaces/user.interface";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  @HttpCode(201)
  async createUser(@Body() body: NewUserDto) {
    await this.userService.create(body)
  }

  @Get(":username")
  @HttpCode(200)
  async getUser(@Param("username") username: string): Promise<User> {
    const user = await this.userService.findOne(username)
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user
  }
}
