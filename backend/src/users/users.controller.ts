// src/users/users.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtStrategy } from '../auth/jwt.strategy';

@Controller('users')
export class UsersController {
  @UseGuards(JwtStrategy)
  @Get('me')
  async getMe(@Req() req) {
    const { id, name, email, role } = req.user;
    return { id, name, email, role }; // Return role here
  }
}
