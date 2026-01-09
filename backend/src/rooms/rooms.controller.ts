import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from '../schemas/room.schema';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'Room created successfully' })
  @ApiResponse({ status: 409, description: 'Room already exists' })
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'Return all rooms' })
  findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a room by id' })
  @ApiResponse({ status: 200, description: 'Return the room' })
  @ApiResponse({ status: 404, description: 'Room not found' })
  findOne(@Param('id') id: string): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a room' })
  @ApiResponse({ status: 200, description: 'Room deleted successfully' })
  @ApiResponse({ status: 404, description: 'Room not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.roomsService.remove(id);
  }
}
