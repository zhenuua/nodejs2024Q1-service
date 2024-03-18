import { Module, forwardRef } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { FavoriteModule } from '../favorite/favorite.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [
    TypeOrmModule.forFeature([Track, Album, Artist]),
    forwardRef(() => FavoriteModule),
  ],
  exports: [TrackService],
})
export class TrackModule { }
