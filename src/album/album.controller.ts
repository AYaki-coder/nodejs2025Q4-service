import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Album } from './entities/album.entity';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('albums')
@UseGuards(AuthGuard)
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new album' })
  @ApiResponse({
    status: 201,
    description: 'The album has been successfully created.',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation failure).',
  })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all albums' })
  @ApiResponse({
    status: 200,
    description: 'Return all albums.',
    type: Album,
    isArray: true,
  })
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an album' })
  @ApiResponse({
    status: 200,
    description: 'The album has been successfully retrieved.',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation failure).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an album' })
  @ApiResponse({
    status: 200,
    description: 'The album has been successfully updated.',
    type: Album,
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
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete an album',
    description: 'The album has been successfully deleted.',
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
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.remove(id);
  }
}
