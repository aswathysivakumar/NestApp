import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiResponseProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of User',
    example: 'test',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email of User',
    example: 'test@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password to login for the user',
    example: 'Abc1234#',
    writeOnly: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'The role of User',
    example: 'INTERN OR ADMIN',
  })
  @IsEnum(['INTERN', 'ADMIN'], {
    message: 'valid role required',
  })
  role: 'INTERN' | 'ADMIN';
}
