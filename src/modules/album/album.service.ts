import { Injectable } from '@nestjs/common';
import { DB } from 'src/database/db.service';
import { AlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { EntityDoesNotExist } from 'src/errors/errors';
import { ENTITIES } from 'src/constants';

@Injectable()
export class AlbumService {
  constructor(private db: DB) { }

  findAll() {
    return this.db.album.findAll();
  }

  findOne(id: string) {
    const album = this.db.album.findOne(id);
    if (!album) throw new EntityDoesNotExist(ENTITIES.ALBUM);
    return album;
  }

  create(dto: AlbumDto) {
    const album = this.db.album.create(dto);
    if (!album) throw new EntityDoesNotExist(ENTITIES.ALBUM);
    return album;
  }

  update(id: string, updateDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    if (!album) throw new EntityDoesNotExist(ENTITIES.ALBUM);
    album.artistId = updateDto.artistId;
    album.year = updateDto.year;
    return this.db.album.update(album);
  }

  delete(id: string) {
    const album = this.findOne(id);
    if (!album) throw new EntityDoesNotExist(ENTITIES.ALBUM);
    return this.db.album.delete(album);
  }
}
