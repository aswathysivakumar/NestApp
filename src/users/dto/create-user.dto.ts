import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiResponseProperty({
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'The name of User',
    example: 'test'
  })

  @IsNotEmpty()
  @IsString()
  name: string;
  
  @ApiProperty({
    description: 'The email of User',
    example: 'test@email.com'
  })

  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The role of User',
    example: 'INTERN OR ADMIN'
  })

  @IsEnum(["INTERN", "ADMIN"], {
    message: 'valid role required'
  })
  role: "INTERN" | "ADMIN";
}
