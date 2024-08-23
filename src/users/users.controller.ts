import { Controller, Get, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

	constructor(private readonly usersService: UsersService) {}

  @Get() // /users
	findAll() {
		const isConditionMet = true

		if (isConditionMet) {
      return {
        data: { value: this.usersService.findAll() },
        message: "Data returned successfully",
        statusCode: HttpStatus.OK,
        status: "success",
      };
    } else {
      return {
        data: {},
        message: "Something went wrong",
        statusCode: HttpStatus.BAD_REQUEST,
        status: "fail",
      };
    }
	}
}
