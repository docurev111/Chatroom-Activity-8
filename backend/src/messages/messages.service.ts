import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Message } from '../schemas/message.schema';
import { User } from '../schemas/user.schema';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<Message>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    // Find or create user
    let user = await this.userModel.findOne({
      username: createMessageDto.username,
    });

    if (!user) {
      user = new this.userModel({ username: createMessageDto.username });
      user = await user.save();
    }

    const message = new this.messageModel({
      content: createMessageDto.content,
      roomId: new Types.ObjectId(createMessageDto.roomId),
      userId: user._id,
      username: createMessageDto.username,
    });

    return await message.save();
  }

  async findByRoom(roomId: string): Promise<any[]> {
    const messages = await this.messageModel
      .find({ roomId: new Types.ObjectId(roomId) })
      .sort({ createdAt: 1 })
      .exec();

    // Map messages to include all needed fields
    return messages.map(message => ({
      id: message._id.toString(),
      content: message.content,
      roomId: message.roomId.toString(),
      userId: message.userId.toString(),
      username: message.username,
      createdAt: (message as any).createdAt,
    }));
  }

  async findAll(): Promise<Message[]> {
    return await this.messageModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
  }
}
