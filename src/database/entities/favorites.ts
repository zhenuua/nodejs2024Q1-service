import { IFavorites } from 'src/types';
import { artists } from './artists';
import { tracks } from './tracks';
import { albums } from './albums';
import { validate } from 'uuid';
import { InvalidEntityId } from 'src/errors/errors';
import { ENTITIES } from 'src/constants';

export const favorites: IFavorites = { artists: [], albums: [], tracks: [] };

const findAllFav = () => {
  const currentArtists = [...artists.values()];
  const currentTracks = [...tracks.values()];
  const currentAlbums = [...albums.values()];
  return {
    artists: currentArtists.filter((artist) =>
      favorites.artists.includes(artist.id),
    ),
    tracks: currentTracks.filter((artist) =>
      favorites.tracks.includes(artist.id),
    ),
    albums: currentAlbums.filter((artist) =>
      favorites.albums.includes(artist.id),
    ),
  };
};

const saveFav = (id: string, type: string) => {
  if (!validate(id)) throw new InvalidEntityId(ENTITIES.FAV);
  favorites[`${type}s`].push(id);
};

const deleteFav = (id: string, type: string) => {
  const currentType = type + 's';
  favorites[currentType] = favorites[currentType].filter(
    (entityId) => entityId !== id,
  );
};

export const getFavsMethods = () => ({
  findAll: findAllFav,
  save: saveFav,
  delete: deleteFav,
});
