import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Query,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@SkipThrottle()
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SkipThrottle({ default: false })
  @Get() // GET /users
  @ApiQuery({ name: 'role', required: false, enum: ['INTERN', 'ADMIN'] })
  @ApiResponse({ type: [CreateUserDto] })
  findAll(@Query('role') role?: 'INTERN' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  @ApiResponse({ type: CreateUserDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id') // PATCH /users/:id
  @ApiResponse({ description: 'Created New User', type: UpdateUserDto })
  @ApiBody({ type: UpdateUserDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id') // DELETE /users/:id
  @ApiResponse({ type: CreateUserDto })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
