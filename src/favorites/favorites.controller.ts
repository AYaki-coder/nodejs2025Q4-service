import {
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@ApiTags('favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorite artists, albums, and tracks' })
  @ApiResponse({
    status: 200,
    description: 'Returns all favorites.',
    type: FavoritesResponseDto,
  })
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add a track to favorites' })
  @ApiParam({ name: 'id', description: 'UUID of the track', type: String })
  @ApiCreatedResponse({ description: 'Track added successfully.', type: Track })
  @ApiBadRequestResponse({
    description: 'Bad request. ID is not a valid UUID.',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Track does not exist in the database.',
  })
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add an album to favorites' })
  @ApiParam({ name: 'id', description: 'UUID of the album', type: String })
  @ApiCreatedResponse({ description: 'Album added successfully.', type: Album })
  @ApiBadRequestResponse({
    description: 'Bad request. ID is not a valid UUID.',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Album does not exist in the database.',
  })
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add an artist to favorites' })
  @ApiParam({ name: 'id', description: 'UUID of the artist', type: String })
  @ApiCreatedResponse({
    description: 'Artist added successfully.',
    type: Artist,
  })
  @ApiBadRequestResponse({
    description: 'Bad request. ID is not a valid UUID.',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Artist does not exist in the database.',
  })
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove a track from favorites' })
  @ApiParam({ name: 'id', description: 'UUID of the track', type: String })
  @ApiNoContentResponse({
    description: 'Track removed successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. ID is not a valid UUID.',
  })
  @ApiNotFoundResponse({
    description: 'Track is not in favorites.',
  })
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove an album from favorites' })
  @ApiParam({ name: 'id', description: 'UUID of the album', type: String })
  @ApiNoContentResponse({
    description: 'Album removed successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Album is not in favorites.',
  })
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoritesService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove an artist from favorites' })
  @ApiParam({ name: 'id', description: 'UUID of the artist', type: String })
  @ApiNoContentResponse({
    description: 'Artist removed successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Artist is not in favorites.',
  })
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.deleteArtist(id);
  }
}
