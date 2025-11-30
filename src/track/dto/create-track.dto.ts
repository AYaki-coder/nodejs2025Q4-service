import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @ValidateIf((track) => track.artistId !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;
  @ValidateIf((track) => track.albumId !== null)
  @IsString()
  @IsNotEmpty()
  albumId: string | null;
  @IsInt()
  duration: number;
}
