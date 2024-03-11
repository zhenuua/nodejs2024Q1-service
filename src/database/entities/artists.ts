import { randomUUID } from 'crypto';
import { ArtistDto } from 'src/modules/artist/dto/artist.dto';
import { IArtist } from 'src/types';
import { tracks } from './tracks';
import { albums } from './albums';

export const artists = new Map<string, IArtist>();

const findAllArtist = () => {
  return [...artists.values()];
};

const findArtist = (id: string) => {
  return artists.get(id);
};

const createArtist = (dto: ArtistDto) => {
  const artist = {
    id: randomUUID(),
    name: dto.name,
    grammy: dto.grammy,
  };

  artists.set(artist.id, artist);

  return artist;
};

const deleteArtist = (artist: IArtist) => {
  for (const album of albums.values()) {
    if (album.artistId === artist.id) album.artistId = null;
  }

  for (const track of tracks.values()) {
    if (track.artistId === artist.id) track.artistId = null;
  }

  artists.delete(artist.id);
};

const updateArtist = (artist: IArtist) => {
  artists.set(artist.id, artist);
  return artist;
};

export const getArtistsMethods = () => ({
  findAll: findAllArtist,
  findOne: findArtist,
  create: createArtist,
  update: updateArtist,
  delete: deleteArtist,
});
