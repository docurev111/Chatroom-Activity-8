import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'The content of the message' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: 'The room ID (MongoDB ObjectId)' })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({ description: 'The username' })
  @IsString()
  @IsNotEmpty()
  username: string;
}
