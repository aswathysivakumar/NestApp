import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email of User',
    example: 'test@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password to login for the user',
    example: 'Abc1234#',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
