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
import { Favorite } from '../favorites/entities/favorite.entity';

@Injectable()
export class InMemoryDatabaseService {
  private readonly users: User[] = [];
  private readonly artists: Artist[] = [];
  private readonly albums: Album[] = [];
  private readonly tracks: Track[] = [];
  private readonly favorites: Favorite = {
    albums: [],
    artists: [],
    tracks: [],
  };

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
    if (inx === -1) {
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
    if (inx === -1) {
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
    if (inx === -1) {
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
    const inx = this.tracks.findIndex((x) => x.id === id);
    if (inx === -1) {
      return;
    }

    const deletedTrack: Track[] = this.tracks.splice(inx, 1);

    return deletedTrack[0];
  }

  getAllFavorites(): Favorite {
    return this.favorites;
  }

  addTrackToFavorites(id: string): string {
    const trackId = this.favorites.tracks.find((x) => x === id);
    if (trackId) {
      return trackId;
    }
    this.favorites.tracks.push(id);
    return id;
  }

  addAlbumToFavorites(id: string): string {
    const albumId = this.favorites.albums.find((x) => x === id);
    if (albumId) {
      return albumId;
    }
    this.favorites.albums.push(id);
    return id;
  }

  addArtistToFavorites(id: string): string {
    const artistId = this.favorites.artists.find((x) => x === id);
    if (artistId) {
      return artistId;
    }
    this.favorites.artists.push(id);
    return id;
  }

  deleteTrackFromFavorites(id: string): string {
    const inx = this.favorites.tracks.findIndex((x) => x === id);
    if (inx === -1) {
      return;
    }

    const deletedTrackId: string[] = this.favorites.tracks.splice(inx, 1);

    return deletedTrackId[0];
  }

  deleteAlbumFromFavorites(id: string): string {
    const inx = this.favorites.albums.findIndex((x) => x === id);
    if (inx === -1) {
      return;
    }

    const deletedAlbumId: string[] = this.favorites.albums.splice(inx, 1);

    return deletedAlbumId[0];
  }

  deleteArtistFromFavorites(id: string): string {
    const inx = this.favorites.artists.findIndex((x) => x === id);
    if (inx === -1) {
      return;
    }

    const deletedArtistId: string[] = this.favorites.artists.splice(inx, 1);

    return deletedArtistId[0];
  }
}
