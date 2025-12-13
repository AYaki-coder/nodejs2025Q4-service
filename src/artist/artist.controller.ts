import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('artists')
@UseGuards(AuthGuard)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully created.',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation failure).',
  })
  async create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all artists' })
  @ApiResponse({
    status: 200,
    description: 'Return all artists.',
    type: Artist,
    isArray: true,
  })
  async findAll(): Promise<Artist[]> {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an artist' })
  @ApiResponse({
    status: 200,
    description: 'The artist has been successfully retrieved.',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation failure).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return await this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an artist' })
  @ApiResponse({
    status: 200,
    description: 'The artist has been successfully updated.',
    type: Artist,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation failure).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete an artist',
    description: 'The artist has been successfully deleted.',
  })
  @ApiResponse({
    status: 204,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation failure).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.artistService.remove(id);
  }
}
