import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { randomUUID } from 'node:crypto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { Artist } from '../artist/entities/artist.entity';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';
import { Album } from '../album/entities/album.entity';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { Track } from '../track/entities/track.entity';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';

@Injectable()
export class InMemoryDatabaseService {
  private readonly users: User[] = [];
  public readonly artists: Artist[] = [];
  public readonly albums: Album[] = [];
  public readonly tracks: Track[] = [];
  // public readonly favorites: Favorite[] = [];

  public getAllUsers(): User[] {
    return this.users;
  }

  public getUserById(id: string): User | undefined {
    return this.users.find((x) => x.id === id);
  }

  public createUser(dto: CreateUserDto): User {
    const now = Date.now();
    const user = {
      id: randomUUID(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };

    this.users.push(user);

    return user;
  }

  public updateUser(id: string, dto: UpdateUserDto): User | undefined {
    const user = this.getUserById(id);

    if (!user) {
      return;
    }
    const now = Date.now();

    user.password = dto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = now;

    return user;
  }

  public deleteUser(id: string): User | undefined {
    const inx = this.users.findIndex((x) => x.id === id);
    if (!inx) {
      return;
    }

    const deletedUser: User[] = this.users.splice(inx, 1);

    return deletedUser[0];
  }

  public getAllArtists(): Artist[] {
    return this.artists;
  }

  public getArtistById(id: string): Artist | undefined {
    return this.artists.find((x) => x.id === id);
  }

  public createArtist(dto: CreateArtistDto): Artist {
    const artist = {
      id: randomUUID(),
      ...dto,
    };

    this.artists.push(artist);

    return artist;
  }

  public updateArtist(id: string, dto: UpdateArtistDto): Artist | undefined {
    const artist = this.getArtistById(id);

    if (!artist) {
      return;
    }

    Object.assign(artist, dto);

    return artist;
  }

  public deleteArtist(id: string): Artist | undefined {
    const inx = this.artists.findIndex((x) => x.id === id);
    if (!inx) {
      return;
    }

    const deletedArtist: Artist[] = this.artists.splice(inx, 1);

    return deletedArtist[0];
  }

  public getAllAlbums(): Album[] {
    return this.albums;
  }

  public getAlbumById(id: string): Album | undefined {
    return this.albums.find((x) => x.id === id);
  }

  public createAlbum(dto: CreateAlbumDto): Album {
    const album = {
      id: randomUUID(),
      ...dto,
    };

    this.albums.push(album);

    return album;
  }

  public updateAlbum(id: string, dto: UpdateAlbumDto): Album | undefined {
    const album = this.getAlbumById(id);

    if (!album) {
      return;
    }

    Object.assign(album, dto);

    return album;
  }

  public deleteAlbum(id: string): Album | undefined {
    const inx = this.albums.findIndex((x) => x.id === id);
    if (!inx) {
      return;
    }

    const deletedAlbum: Album[] = this.albums.splice(inx, 1);

    return deletedAlbum[0];
  }

  public getAllTracks(): Track[] {
    return this.tracks;
  }

  public getTrackById(id: string): Track | undefined {
    return this.tracks.find((x) => x.id === id);
  }

  public createTrack(dto: CreateTrackDto): Track {
    const track = {
      id: randomUUID(),
      ...dto,
    };

    this.tracks.push(track);

    return track;
  }

  public updateTrack(id: string, dto: UpdateTrackDto): Track | undefined {
    const track = this.getTrackById(id);

    if (!track) {
      return;
    }

    Object.assign(track, dto);

    return track;
  }

  public deleteTrack(id: string): Track | undefined {
    const inx = this.albums.findIndex((x) => x.id === id);
    if (!inx) {
      return;
    }

    const deletedTrack: Track[] = this.tracks.splice(inx, 1);

    return deletedTrack[0];
  }
}
