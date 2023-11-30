import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateRefreshToken(user: any) {
    console.log("user", user)
    const payload = {username: user.username};
    return this.jwtService.sign(payload, {expiresIn: "30d"});
  }
}
