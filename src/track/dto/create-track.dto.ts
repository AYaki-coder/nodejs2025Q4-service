import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    description: 'The name of the track',
    example: 'Nebel',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      'The UUID of the artist who created the album, or null if the artist does not exist.',
    type: String,
    nullable: true,
    example: ['7f69ce5a-6eee-4fc4-a800-0372b05d9987', null],
  })
  @ValidateIf((track) => track.artistId !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;

  @ApiProperty({
    description:
      'The UUID of the album where the track belongs, or null if the album does not exist.',
    type: String,
    nullable: true,
    example: ['7f69ce5a-6eee-4fc4-a800-0372b05d9987', null],
  })
  @ValidateIf((track) => track.albumId !== null)
  @IsString()
  @IsNotEmpty()
  albumId: string | null;

  @ApiProperty({
    description: 'The duration of the track in sec',
    example: 188,
  })
  @IsInt()
  duration: number;
}
