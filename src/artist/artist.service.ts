import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryDatabaseService } from '../in-memory-database/in-memory-database.service';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly db: InMemoryDatabaseService) {}

  create(createArtistDto: CreateArtistDto): Artist {
    return this.db.createArtist(createArtistDto);
  }

  findAll(): Artist[] {
    return this.db.getAllArtists();
  }

  findOne(id: string): Artist {
    const artist = this.db.getArtistById(id);
    if (!artist) {
      throw new NotFoundException();
    }

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.db.getArtistById(id);
    if (!artist) {
      throw new NotFoundException();
    }

    return this.db.updateArtist(id, updateArtistDto);
  }

  remove(id: string): Artist {
    const deletedArtist = this.db.deleteArtist(id);
    if (!deletedArtist) {
      throw new NotFoundException();
    }

    const relatedTracks = this.db
      .getAllTracks()
      .filter((track) => track.artistId === deletedArtist.id);

    relatedTracks.forEach((track) =>
      this.db.updateTrack(track.id, { ...track, artistId: null }),
    );

    const relatedAlbums = this.db
      .getAllAlbums()
      .filter((album) => album.artistId === deletedArtist.id);

    relatedAlbums.forEach((album) =>
      this.db.updateAlbum(album.id, { ...album, artistId: null }),
    );

    this.db.deleteArtistFromFavorites(id);

    return deletedArtist;
  }
}
