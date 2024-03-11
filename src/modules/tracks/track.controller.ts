import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto, UpdateTrackDto } from './dto/track.dto';
import { UUID } from 'src/database/uuid.dto';
import { ENTITIES } from 'src/constants';

@Controller(ENTITIES.TRACK)
export class TrackController {
  constructor(private trackService: TrackService) {}
  @Get()
  getAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  getOne(@Param() { id }: UUID) {
    return this.trackService.findOne(id);
  }

  @Post()
  create(@Body() createTrackDto: TrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  update(@Param() { id }: UUID, @Body() updateDto: UpdateTrackDto) {
    return this.trackService.update(id, updateDto);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param() { id }: UUID) {
    return this.trackService.delete(id);
  }
}
