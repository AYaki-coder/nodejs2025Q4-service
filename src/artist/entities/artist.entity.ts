import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    description: 'The id  of the artist',
    example: '4de888bd-af6a-497e-aace-f90641e9d33c',
  })
  id: string;
  @ApiProperty({
    description: 'The name of the artist',
    example: 'Freddie Mercury',
  })
  name: string;
  @ApiProperty({
    description: 'Whether the artist has won a Grammy award',
    example: true,
  })
  grammy: boolean;
}
