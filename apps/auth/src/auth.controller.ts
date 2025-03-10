import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  @MessagePattern({ cmd: 'test' })
  getHello(@Ctx() context: RmqContext, @Payload() data: any): string {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    // Log received data
    this.logger.log(`Received message: ${JSON.stringify(data)}`);

    // Acknowledge message to remove it from the queue
    channel.ack(message);

    return `Hello World! ${JSON.stringify(data)}`;
  }
}
