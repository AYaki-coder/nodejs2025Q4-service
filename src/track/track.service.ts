import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InMemoryDatabaseService } from '../in-memory-database/in-memory-database.service';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly db: InMemoryDatabaseService) {}

  create(createTrackDto: CreateTrackDto): Track {
    return this.db.createTrack(createTrackDto);
  }

  findAll(): Track[] {
    return this.db.getAllTracks();
  }

  findOne(id: string): Track {
    const track = this.db.getTrackById(id);
    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const track = this.db.getTrackById(id);
    if (!track) {
      throw new NotFoundException();
    }

    return this.db.updateTrack(id, updateTrackDto);
  }

  remove(id: string): Track {
    const deletedTrack = this.db.deleteTrack(id);
    if (!deletedTrack) {
      throw new NotFoundException();
    }
    return deletedTrack;
  }
}
