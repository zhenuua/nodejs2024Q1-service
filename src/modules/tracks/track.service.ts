import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';
import { EntityDoesNotExist } from 'src/errors/errors';
import { ITrack } from 'src/types';
import { ENTITIES } from 'src/constants';
import { Track } from './track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { FavoriteService } from '../favorite/favorite.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {}

  async getTrack(id: string, Err = EntityDoesNotExist) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new Err(ENTITIES.TRACK);
    return track;
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.getTrack(id);
    return track;
  }

  async create(dto: TrackDto): Promise<ITrack> {
    const newTrack = new Track({ ...dto });
    newTrack.id = randomUUID();
    const track = this.trackRepository.create(newTrack);
    return await this.trackRepository.save(track);
  }

  async update(id: string, updateDto: UpdateTrackDto) {
    const track = await this.getTrack(id);
    const updatedTrack = Object.assign(track, updateDto);
    return await this.trackRepository.save(updatedTrack);
  }

  async delete(id: string) {
    await this.getTrack(id);
    await this.trackRepository.delete(id);
  }
}
