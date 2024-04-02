import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { EntityDoesNotExist, EntityIdDoesNotFound } from 'src/errors/errors';
import { ENTITIES } from 'src/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from '../tracks/track.entity';
import { randomUUID } from 'crypto';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../tracks/track.service';

const types = [ENTITIES.TRACK, ENTITIES.ALBUM, ENTITIES.ARTIST];

const getResponse = (entity: Artist | Track | Album) => {
  if (entity instanceof Artist) {
    const { grammy, name, id } = entity;
    return { grammy, name, id };
  } else if (entity instanceof Track) {
    const { artistId, id, name, albumId, duration } = entity;
    return { artistId, id, name, albumId, duration };
  } else if (entity instanceof Album) {
    const { artistId, id, name, year } = entity;
    return { artistId, id, name, year };
  }
};

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,

    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,

    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,

    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,

    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  async findAll() {
    const favArtists = await this.artistRepository.find();
    const favAlbums = await this.albumRepository.find();
    const favTracks = await this.trackRepository.find();
    return {
      id: randomUUID(),
      artists: favArtists.map((entity) => getResponse(entity)),
      albums: favAlbums.map((entity) => getResponse(entity)),
      tracks: favTracks.map((entity) => getResponse(entity)),
    };
  }

  async create(id: string, type: string) {
    if (!types.includes(type)) throw new EntityDoesNotExist(ENTITIES.FAV);

    switch (type) {
      case ENTITIES.ARTIST:
        const artist = await this.artistService.getArtist(
          id,
          EntityIdDoesNotFound,
        );
        return getResponse(artist);
      case ENTITIES.ALBUM:
        const album = await this.albumService.getAlbum(
          id,
          EntityIdDoesNotFound,
        );
        return getResponse(album);
      case ENTITIES.TRACK:
        const track = await this.trackService.getTrack(
          id,
          EntityIdDoesNotFound,
        );
        return getResponse(track);
    }
  }

  async delete(id: string, type: string) {
    if (!types.includes(type)) throw new EntityDoesNotExist(ENTITIES.FAV);
    switch (type) {
      case ENTITIES.ARTIST:
        return undefined;
      case ENTITIES.ALBUM:
        return undefined;
      case ENTITIES.TRACK:
        return undefined;
    }
  }
}
