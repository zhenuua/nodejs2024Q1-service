import { Injectable } from '@nestjs/common';
import { ArtistDto, UpdateArtistDto } from './dto/artist.dto';
import { EntityDoesNotExist } from 'src/errors/errors';
import { ENTITIES } from 'src/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { Artist } from './artist.entity';
import { Album } from '../album/album.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,

    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}
  async getArtist(id: string, Err = EntityDoesNotExist) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new Err(ENTITIES.ARTIST);
    return artist;
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.getArtist(id);
    return artist;
  }

  async create(dto: ArtistDto) {
    const newArtist = new Artist({ ...dto });
    newArtist.id = randomUUID();
    const createdArtist = this.artistRepository.create(newArtist);
    return await this.artistRepository.save(createdArtist);
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.getArtist(id);
    const updatedArtist = Object.assign(artist, dto);
    return await this.artistRepository.save(updatedArtist);
  }

  async delete(id: string) {
    await this.getArtist(id);
    await this.artistRepository.delete(id);
  }
}
