import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    description: 'The id  of the track',
    example: '4de888bd-af6a-497e-aace-f90641e9d33c',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the track',
    example: 'Nebel',
  })
  name: string;

  @ApiProperty({
    description:
      'The UUID of the artist who created the album, or null if the artist does not exist.',
    type: String,
    nullable: true,
    example: ['7f69ce5a-6eee-4fc4-a800-0372b05d9987', null],
  })
  artistId: string | null;

  @ApiProperty({
    description:
      'The UUID of the album where the track belongs, or null if the album does not exist.',
    type: String,
    nullable: true,
    example: ['7f69ce5a-6eee-4fc4-a800-0372b05d9987', null],
  })
  albumId: string | null;

  @ApiProperty({
    description: 'The duration of the track in sec',
    example: 188,
  })
  duration: number;
}
