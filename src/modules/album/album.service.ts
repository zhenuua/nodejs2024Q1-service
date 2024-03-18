import { Injectable } from '@nestjs/common';
import { AlbumDto, UpdateAlbumDto } from './dto/album.dto';
import { EntityDoesNotExist } from 'src/errors/errors';
import { ENTITIES } from 'src/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { Track } from '../tracks/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,

    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) { }

  async getAlbum(id: string, Err = EntityDoesNotExist) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new Err(ENTITIES.ALBUM);
    return album;
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.getAlbum(id);
    return album;
  }

  async create(dto: AlbumDto) {
    const newAlbum = new Album({ ...dto });
    newAlbum.id = randomUUID();
    const createdTrack = this.albumRepository.create(newAlbum);
    return await this.albumRepository.save(createdTrack);
  }

  async update(id: string, updateDto: UpdateAlbumDto) {
    const album = await this.getAlbum(id);
    const updatedAlbum = Object.assign(album, updateDto);
    return await this.albumRepository.save(updatedAlbum);
  }

  async delete(id: string) {
    await this.getAlbum(id);
    await this.albumRepository.delete(id);
  }
}
