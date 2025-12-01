import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@ApiTags('tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiResponse({
    status: 201,
    description: 'The track has been successfully created.',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation failure).',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tracks' })
  @ApiResponse({
    status: 200,
    description: 'Return all tracks.',
    type: Track,
    isArray: true,
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a track' })
  @ApiResponse({
    status: 200,
    description: 'The track has been successfully retrieved.',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation failure).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a track' })
  @ApiResponse({
    status: 200,
    description: 'The track has been successfully updated.',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request (Validation failure).',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete a track',
    description: 'The track has been successfully deleted.',
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
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.remove(id);
  }
}
