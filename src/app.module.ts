import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as ms from 'ms';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const expiresInValue =
          configService.get<ms.StringValue>('TOKEN_EXPIRE_TIME');

        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: ms(expiresInValue) ?? '30min',
          },
        };
      },
      inject: [ConfigService],
      global: true,
    }),
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    UserModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
