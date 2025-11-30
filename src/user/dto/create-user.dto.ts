import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
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
