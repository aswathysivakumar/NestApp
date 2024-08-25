import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
	private users = [
		{ id: 1,
			name: 'test',
			email: 'test@gmail.com'
		},
		{ id: 2,
			name: 'test1',
			email: 'test1@gmail.com'
		},
	]
	findAll() {
		const isConditionMet = true

		if (isConditionMet) {
      return {
        data: { value: this.users },
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
