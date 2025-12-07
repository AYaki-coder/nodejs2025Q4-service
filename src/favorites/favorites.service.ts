import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<FavoritesResponseDto> {
    const artists = await this.prisma.artist.findMany({
      where: { favorite: true },
      omit: {
        favorite: true,
      },
    });
    const albums = await this.prisma.album.findMany({
      where: { favorite: true },
      omit: {
        favorite: true,
      },
    });
    const tracks = await this.prisma.track.findMany({
      where: { favorite: true },
      omit: {
        favorite: true,
      },
    });

    return { artists, tracks, albums };
  }

  async addTrack(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new UnprocessableEntityException();
    }
    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: { favorite: true },
      omit: {
        favorite: true,
      },
    });

    return updatedTrack;
  }

  async deleteTrack(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException();
    }
    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: { favorite: false },
      omit: {
        favorite: true,
      },
    });

    return updatedTrack;
  }

  async addAlbum(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new UnprocessableEntityException();
    }
    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: { favorite: true },
      omit: {
        favorite: true,
      },
    });

    return updatedAlbum;
  }

  async deleteAlbum(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException();
    }
    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: { favorite: false },
      omit: {
        favorite: true,
      },
    });

    return updatedAlbum;
  }

  async addArtist(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new UnprocessableEntityException();
    }
    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: { favorite: true },
      omit: {
        favorite: true,
      },
    });

    return updatedArtist;
  }

  async deleteArtist(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new NotFoundException();
    }
    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: { favorite: false },
      omit: {
        favorite: true,
      },
    });

    return updatedArtist;
  }
}
