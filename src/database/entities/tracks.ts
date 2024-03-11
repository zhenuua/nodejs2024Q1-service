import { randomUUID } from 'crypto';
import { TrackDto } from 'src/modules/tracks/dto/track.dto';
import { ITrack } from 'src/types';

export const tracks = new Map<string, ITrack>();

const findAllTrack = () => {
  return [...tracks.values()];
};

const findTrack = (id: string) => {
  return tracks.get(id);
};

const createTrack = (dto: TrackDto): ITrack => {
  const track = {
    id: randomUUID(),
    name: dto.name,
    artistId: dto?.artistId ?? null,
    albumId: dto?.albumId ?? null,
    duration: dto?.duration,
  };

  tracks.set(track.id, track);

  return track;
};

const deleteTrack = async (track: ITrack): Promise<void> => {
  tracks.delete(track.id);
};

const updateTrack = (track: ITrack) => {
  tracks.set(track.id, track);
  return track;
};

export const getTracksMethods = () => ({
  findAll: findAllTrack,
  findOne: findTrack,
  create: createTrack,
  update: updateTrack,
  delete: deleteTrack,
});
