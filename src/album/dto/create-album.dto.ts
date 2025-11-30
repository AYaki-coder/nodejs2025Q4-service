import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsNotEmpty()
  year: number;
  @ValidateIf((album) => album.artistId !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;
}
