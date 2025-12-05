import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'The name of the album',
    example: 'Mutter',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    description: 'The release year of the album',
    example: 2001,
  })
  @IsInt()
  @IsNotEmpty()
  year: number;
  @ApiProperty({
    description:
      'The UUID of the artist who created the album, or null if the artist does not exist.',
    type: String,
    nullable: true,
    example: ['7f69ce5a-6eee-4fc4-a800-0372b05d9987', null],
  })
  @ValidateIf((album) => album.artistId !== null)
  @IsUUID()
  @IsNotEmpty()
  artistId: string | null;
}
