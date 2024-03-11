import { Injectable } from '@nestjs/common';
import { getUsersMethods } from './entities/users';
import { getAlbumsMethods } from './entities/albums';
import { getTracksMethods } from './entities/tracks';
import { getArtistsMethods } from './entities/artists';
import { getFavsMethods } from './entities/favorites';

@Injectable()
export class DB {
  get user() {
    return getUsersMethods();
  }

  get track() {
    return getTracksMethods();
  }

  get artist() {
    return getArtistsMethods();
  }

  get album() {
    return getAlbumsMethods();
  }

  get fav() {
    return getFavsMethods();
  }
}
