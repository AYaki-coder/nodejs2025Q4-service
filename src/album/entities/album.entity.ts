import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    description: 'The id  of the album',
    example: '4de888bd-af6a-497e-aace-f90641e9d33c',
  })
  id: string;
  @ApiProperty({
    description: 'The name of the album',
    example: 'Mutter',
  })
  name: string;
  @ApiProperty({
    description: 'The release year of the album',
    example: 2001,
  })
  year: number;
  @ApiProperty({
    description:
      'The UUID of the artist who created the album, or null if the artist does not exist.',
    type: String,
    nullable: true,
    example: ['7f69ce5a-6eee-4fc4-a800-0372b05d9987', null],
  })
  artistId: string | null;
}
