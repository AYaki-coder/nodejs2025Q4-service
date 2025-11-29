import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { randomUUID } from 'node:crypto';
import { Artist } from '../artist/entities/artist.entity';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';
import { Album } from '../album/entities/album.entity';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { Track } from '../track/entities/track.entity';
import { CreateTrackDto } from '../track/dto/create-track.dto';
import { UpdateTrackDto } from '../track/dto/update-track.dto';
import { UpdatePasswordDto } from '../user/dto/update-password.dto';

@Injectable()
export class InMemoryDatabaseService {
  private readonly users: User[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly tracks: Track[] = [];
  // public readonly favorites: Favorite[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find((x) => x.id === id);
  }

  createUser(dto: CreateUserDto): User {
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

  updateUser(id: string, dto: UpdatePasswordDto): User | undefined {
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

  deleteUser(id: string): User | undefined {
    const inx = this.users.findIndex((x) => x.id === id);
    if (!inx) {
      return;
    }

    const deletedUser: User[] = this.users.splice(inx, 1);

    return deletedUser[0];
  }

  getAllArtists(): Artist[] {
    return this.artists;
  }

  getArtistById(id: string): Artist | undefined {
    return this.artists.find((x) => x.id === id);
  }

  createArtist(dto: CreateArtistDto): Artist {
    const artist = {
      id: randomUUID(),
      ...dto,
    };

    this.artists.push(artist);

    return artist;
  }

  updateArtist(id: string, dto: UpdateArtistDto): Artist | undefined {
    const artist = this.getArtistById(id);

    if (!artist) {
      return;
    }

    Object.assign(artist, dto);

    return artist;
  }

  deleteArtist(id: string): Artist | undefined {
    const inx = this.artists.findIndex((x) => x.id === id);
    if (!inx) {
      return;
    }

    const deletedArtist: Artist[] = this.artists.splice(inx, 1);

    return deletedArtist[0];
  }

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album | undefined {
    return this.albums.find((x) => x.id === id);
  }

  createAlbum(dto: CreateAlbumDto): Album {
    const album = {
      id: randomUUID(),
      ...dto,
    };

    this.albums.push(album);

    return album;
  }

  updateAlbum(id: string, dto: UpdateAlbumDto): Album | undefined {
    const album = this.getAlbumById(id);

    if (!album) {
      return;
    }

    Object.assign(album, dto);

    return album;
  }

  deleteAlbum(id: string): Album | undefined {
    const inx = this.albums.findIndex((x) => x.id === id);
    if (!inx) {
      return;
    }

    const deletedAlbum: Album[] = this.albums.splice(inx, 1);

    return deletedAlbum[0];
  }

  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track | undefined {
    return this.tracks.find((x) => x.id === id);
  }

  createTrack(dto: CreateTrackDto): Track {
    const track = {
      id: randomUUID(),
      ...dto,
    };

    this.tracks.push(track);

    return track;
  }

  updateTrack(id: string, dto: UpdateTrackDto): Track | undefined {
    const track = this.getTrackById(id);

    if (!track) {
      return;
    }

    Object.assign(track, dto);

    return track;
  }

  deleteTrack(id: string): Track | undefined {
    const inx = this.albums.findIndex((x) => x.id === id);
    if (!inx) {
      return;
    }

    const deletedTrack: Track[] = this.tracks.splice(inx, 1);

    return deletedTrack[0];
  }
}
