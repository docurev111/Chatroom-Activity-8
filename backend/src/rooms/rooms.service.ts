import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from '../schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const existingRoom = await this.roomModel.findOne({
      name: createRoomDto.name,
    });

    if (existingRoom) {
      throw new ConflictException('Room with this name already exists');
    }

    const room = new this.roomModel(createRoomDto);
    return await room.save();
  }

  async findAll(): Promise<Room[]> {
    return await this.roomModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id).exec();
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async remove(id: string): Promise<void> {
    const result = await this.roomModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
  }
}
