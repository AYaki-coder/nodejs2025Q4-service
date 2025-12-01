import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InMemoryDatabaseService } from '../in-memory-database/in-memory-database.service';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { FavoritesResponseDto } from './dto/favorites-response.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: InMemoryDatabaseService) {}

  findAll() {
    const favoritesID = this.db.getAllFavorites();
    const favorites: FavoritesResponseDto = {
      artists: favoritesID.artists.map((id) => this.db.getArtistById(id)),
      albums: favoritesID.albums.map((id) => this.db.getAlbumById(id)),
      tracks: favoritesID.tracks.map((id) => this.db.getTrackById(id)),
    };

    return favorites;
  }

  addTrack(id: string): Track {
    const track = this.db.getTrackById(id);
    if (!track) {
      throw new UnprocessableEntityException();
    }
    this.db.addTrackToFavorites(id);
    return track;
  }

  deleteTrack(id: string) {
    const deletedTrackId = this.db.deleteTrackFromFavorites(id);
    if (!deletedTrackId) {
      throw new NotFoundException();
    }

    return deletedTrackId;
  }

  addAlbum(id: string): Album {
    const album = this.db.getAlbumById(id);
    if (!album) {
      throw new UnprocessableEntityException();
    }
    this.db.addAlbumToFavorites(id);
    return album;
  }

  deleteAlbum(id: string): string {
    const deletedAlbumId = this.db.deleteAlbumFromFavorites(id);
    if (!deletedAlbumId) {
      throw new NotFoundException();
    }

    return deletedAlbumId;
  }

  addArtist(id: string): Artist {
    const artist = this.db.getArtistById(id);
    if (!artist) {
      throw new UnprocessableEntityException();
    }
    this.db.addArtistToFavorites(id);
    return artist;
  }

  deleteArtist(id: string): string {
    const deletedArtistId = this.db.deleteArtistFromFavorites(id);
    if (!deletedArtistId) {
      throw new NotFoundException();
    }

    return deletedArtistId;
  }
}
