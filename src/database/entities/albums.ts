import { randomUUID } from 'crypto';
import { IAlbum } from 'src/types';
import { tracks } from './tracks';
import { AlbumDto } from 'src/modules/album/dto/album.dto';

export const albums = new Map<string, IAlbum>();

const findAllAlbum = () => {
  return [...albums.values()];
};

const findAlbum = (id: string) => {
  return albums.get(id);
};

const createAlbum = (dto: AlbumDto) => {
  const album = {
    id: randomUUID(),
    name: dto.name,
    year: dto.year,
    artistId: dto?.artistId ?? null,
  };
  albums.set(album.id, album);
  return album;
};

const updateAlbum = (album: IAlbum) => {
  albums.set(album.id, album);
  return album;
};

const deleteAlbum = (album: IAlbum) => {
  for (const track of tracks.values()) {
    if (track.albumId === album.id) track.albumId = null;
  }
  albums.delete(album.id);
};

export const getAlbumsMethods = () => ({
  findAll: findAllAlbum,
  findOne: findAlbum,
  create: createAlbum,
  update: updateAlbum,
  delete: deleteAlbum,
});
