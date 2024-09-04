import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class refreshTokenDto {
    @ApiProperty({
      description: 'The refresh token of the User',
      example: '2fd57c4d-c035-4ec9-b7e7-2eddc95e4494'
    })

    @IsString()
    refreshToken: String;
}