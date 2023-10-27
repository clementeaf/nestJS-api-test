import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  // Método para manejar el evento "mensaje" y emitir un mensaje a todos los clientes
  handleMessage(client: Socket, message: string) {
    // Puedes realizar algún procesamiento aquí con el mensaje si es necesario
    console.log(`Mensaje recibido de ${client.id}: ${message}`);

    // Emitir el mensaje a todos los clientes conectados
    this.server.emit('nuevoMensaje', message);
  }
}
