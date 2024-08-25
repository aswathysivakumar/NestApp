import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

	constructor(private readonly usersService: UsersService) {}

  @Get() // /users
	findAll() {
		return this.usersService.findAll()
	}
}
