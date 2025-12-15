import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'The user login/username',
    example: 'newUserLogin',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'The user password ',
    example: 'P@ssw0rd123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
