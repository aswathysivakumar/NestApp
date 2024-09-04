import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { SignupDto } from './dto/signUp.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(private readonly user: UsersService, private jwtService: JwtService) {}

  async signup(signupData: SignupDto) {
		const { email, password, name, role } = signupData
		const emailInUse = await this.user.findWithEmail(email)
		if (emailInUse) throw new BadRequestException("Email already exists")
		const hashedPassword = await bcrypt.hash(password, 10)
	  await this.user.create({ name, email, password: hashedPassword, role: role });
	}

	async login(credentials) {
		const { email, password } = credentials
    const user = await this.user.findWithEmail(email)
		if (!user) throw new UnauthorizedException("User doesn't exist")
		const passwordMatch = await bcrypt.compare(password, user.password)
		if (!passwordMatch) throw new UnauthorizedException("Wrong password!")
		const token =  await this.generateUserTokens(user.id)
	  return { ...token, userId: user.id }
	}

	async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId })
		const refreshToken = uuidv4();
		const tokenExpiryDate = new Date()
		tokenExpiryDate.setDate(tokenExpiryDate.getDate() + 3)
		await this.user.update(userId, { refreshToken, tokenExpiryDate })
		return { accessToken, refreshToken }
	}

	async refreshToken(refreshTokenDto) {
		const { refreshToken } = refreshTokenDto
		const token = await this.user.findWithToken(refreshToken)
		if (!token) throw new UnauthorizedException("Refresh Token is invalid");
		return this.generateUserTokens(token.id)
	}
}
