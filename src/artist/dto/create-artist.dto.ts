import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    description: 'The name of the artist',
    example: 'Freddie Mercury',
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Whether the artist has won a Grammy award',
    example: true,
  })
  @IsBoolean()
  grammy: boolean;
}
