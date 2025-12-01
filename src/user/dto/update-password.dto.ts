import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: "The user's current/old password",
    example: 'CurrentP@ss123',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: "The user's new password",
    example: 'NewAndBetterP@ss123',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
