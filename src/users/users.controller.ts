import { Controller, Get, Param, Body, Post, Patch, Query, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}
  
	@SkipThrottle({ default: false })
  @Get() // GET /users
	findAll(@Query('role') role?: 'INTERN'| 'ADMIN') {
		return this.usersService.findAll(role)
	}
  
	@Throttle({ short: {ttl: 1000, limit: 1 } })
  @Get(':id') // GET /users/:id
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.findOne(id)
	}

  @Post() // POST /users
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto)
  }

  @Patch(':id') // PATCH /users/:id
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: Prisma.UserUpdateInput) {
		return this.usersService.update(id, updateUserDto)
	}

  @Delete(':id') // DELETE /users/:id
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.remove(id)
	}
}
