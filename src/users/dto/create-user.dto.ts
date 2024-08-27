import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(["INTERN", "ADMIN"], {
    message: 'valid role required'
  })
  role: "INTERN" | "ADMIN";
}