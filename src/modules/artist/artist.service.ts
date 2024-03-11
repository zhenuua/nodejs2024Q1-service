import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { ArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { EntityDoesNotExist } from 'src/errors/errors';
import { ENTITIES } from 'src/constants';

@Injectable()
export class ArtistService {
  constructor(private db: DB) { }

  findAll() {
    return this.db.artist.findAll();
  }

  findOne(id: string) {
    const artist = this.db.artist.findOne(id);
    if (!artist) throw new EntityDoesNotExist(ENTITIES.ARTIST);
    return artist;
  }

  create(dto: ArtistDto) {
    const artist = this.db.artist.create(dto);
    return artist;
  }

  update(id: string, dto: UpdateArtistDto) {
    const artist = this.findOne(id);
    if (!artist) throw new EntityDoesNotExist(ENTITIES.ARTIST);
    artist.grammy = dto.grammy;
    return this.db.artist.update(artist);
  }

  delete(id: string) {
    const artist = this.findOne(id);
    if (!artist) throw new EntityDoesNotExist(ENTITIES.ARTIST);
    return this.db.artist.delete(artist);
  }
}
