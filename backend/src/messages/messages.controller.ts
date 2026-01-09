import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from '../schemas/message.schema';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new message' })
  @ApiResponse({ status: 201, description: 'Message created successfully' })
  create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all messages' })
  @ApiResponse({ status: 200, description: 'Return all messages' })
  findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get('room/:roomId')
  @ApiOperation({ summary: 'Get messages by room' })
  @ApiResponse({ status: 200, description: 'Return messages for a room' })
  findByRoom(@Param('roomId') roomId: string): Promise<any[]> {
    return this.messagesService.findByRoom(roomId);
  }
}
