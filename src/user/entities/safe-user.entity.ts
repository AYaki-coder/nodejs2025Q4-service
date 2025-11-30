import { ApiProperty } from '@nestjs/swagger';

export class SafeUserEntity {
  @ApiProperty({
    description: 'The unique identifier for the user (UUID)',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'The user login/username',
    example: 'johndoe123',
  })
  login: string;

  @ApiProperty({
    description: 'Version of the user (incremented on each update)',
    example: 1,
    type: Number,
  })
  version: number;

  @ApiProperty({
    description: 'Timestamp of user creation (Unix epoch in milliseconds)',
    example: 1678886400000,
    type: Number,
  })
  createdAt: number;

  @ApiProperty({
    description: 'Timestamp of last user update (Unix epoch in milliseconds)',
    example: 1678890000000,
    type: Number,
  })
  updatedAt: number;
}
