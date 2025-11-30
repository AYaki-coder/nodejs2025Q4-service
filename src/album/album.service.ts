import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InMemoryDatabaseService } from '../in-memory-database/in-memory-database.service';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private readonly db: InMemoryDatabaseService) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    return this.db.createAlbum(createAlbumDto);
  }

  findAll(): Album[] {
    return this.db.getAllAlbums();
  }

  findOne(id: string): Album {
    const album = this.db.getAlbumById(id);
    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const album = this.db.getAlbumById(id);
    if (!album) {
      throw new NotFoundException();
    }

    return this.db.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string): Album {
    const deletedAlbum = this.db.deleteAlbum(id);
    if (!deletedAlbum) {
      throw new NotFoundException();
    }

    const relatedTracks = this.db
      .getAllTracks()
      .filter((track) => track.albumId === deletedAlbum.id);

    relatedTracks.forEach((track) =>
      this.db.updateTrack(track.id, { ...track, albumId: null }),
    );

    return deletedAlbum;
  }
}
