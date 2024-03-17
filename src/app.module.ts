import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { DbModule } from './database/db.module';
import { UserModule } from './modules/users/user.module';
// import { TrackModule } from './modules/tracks/track.module';
// import { ArtistModule } from './modules/artist/artist.module';
// import { AlbumModule } from './modules/album/album.module';
// import { FavoriteModule } from './modules/favorite/favorite.module';
import typeorm from './typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    // TrackModule,
    // ArtistModule,
    // AlbumModule,
    // FavoriteModule,
    // DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
  ],
})
export class AppModule { }
