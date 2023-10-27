import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleMessage(client: Socket, message: string) {
    console.log(`Mensaje recibido de ${client.id}: ${message}`);
    this.server.emit('nuevoMensaje', message);
  }
}
