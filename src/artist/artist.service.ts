import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InMemoryDatabaseService } from '../in-memory-database/in-memory-database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly db: InMemoryDatabaseService) {}

  create(createArtistDto: CreateArtistDto) {
    return 'This action adds a new artist';
  }

  findAll() {
    return `This action returns all artist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
