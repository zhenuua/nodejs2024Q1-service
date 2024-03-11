import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { EntityDoesNotExist, EntityIdDoesNotFound } from 'src/errors/errors';
import { ENTITIES } from 'src/constants';

const types = [ENTITIES.TRACK, ENTITIES.ALBUM, ENTITIES.ARTIST];

@Injectable()
export class FavoriteService {
  constructor(private db: DB) { }

  findAll() {
    return this.db.fav.findAll();
  }

  async create(id: string, type: string) {
    if (!types.includes(type)) throw new EntityDoesNotExist(ENTITIES.FAV);
    let item;
    switch (type) {
      case ENTITIES.ARTIST:
        item = this.db.artist.findOne(id);
        break;
      case ENTITIES.ALBUM:
        item = this.db.album.findOne(id);
        break;
      case ENTITIES.TRACK:
        item = this.db.track.findOne(id);
        break;
    }
    if (!item) {
      throw new EntityIdDoesNotFound(type);
    }
    return await this.db.fav.save(id, type);
  }

  async delete(id: string, type: string) {
    if (!types.includes(type)) throw new EntityDoesNotExist(ENTITIES.FAV);
    return this.db.fav.delete(id, type);
  }
}
