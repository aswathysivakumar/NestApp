import { Injectable } from '@nestjs/common';

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
		return this.users
	}
}
