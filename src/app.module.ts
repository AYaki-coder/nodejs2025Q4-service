import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { InMemoryDatabaseModule } from './in-memory-database/in-memory-database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    UserModule,
    InMemoryDatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
