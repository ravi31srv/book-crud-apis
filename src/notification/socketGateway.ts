/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtService } from '@nestjs/jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'notification' })
export class notificationGateway {
  @WebSocketServer()
  server: Server;
  jwtService: JwtService;
  client: Socket;

  // Simply logs the message on new socket connection.
  handleConnection(client: Socket, ..._args: any[]) {
    this.client = client;
    console.log(`client with ${client.id} connected...`);
  }

  handleDisconnect(client: any) {
    console.log(`client with ${client.id} disconnected...`);
  }

  //To notify user about the book addition even
  @SubscribeMessage('bookAdded')
  handleBookAddEvent(_client: Socket, data: any) {
    this.server.emit('notifyBookAdd', {
      msg: `New book named ${data.name} added.`,
    });
  }

  //To notify user about the status change of the book
  @SubscribeMessage('statusChangedByUser')
  handleStatusChaneEvent(client: Socket, data: any) {
    this.server.to(client.id).emit('notifySatusChanger', {
      msg: `Status of the book with _id ${data.bookId} has been updated.`,
    });
  }

  //To notify user about the book removal even
  @SubscribeMessage('bookRemoved')
  handleBookDeleteEvent(_client: Socket, data: any) {
    this.server.emit('notifyBookRemoved', {
      msg: `Book with name ${data.book} deleted.`,
    });
  }

  // @SubscribeMessage('joinRoom')
  // handleRoom(client : Socket , data : any) {
  //  client.join(data.name)
  //  client.emit('joinRoom', data.name)
  //  this.server.to(data.name).emit("welcome", `Welcome to the ${data.name} room`)
}
