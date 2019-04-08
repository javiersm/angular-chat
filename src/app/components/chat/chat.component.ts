import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje = '';

  constructor( public chatService: ChatService ) {
    this.chatService.cargarMensajes()
                      .subscribe( (mensajes: any[]) => {
                        console.log('recibiendo mensajes');
                        console.log(mensajes);
                      });
  }

  ngOnInit() {
  }

  enviarMensaje() {
    console.log(this.mensaje);

    if (this.mensaje.length === 0) {
      return;
    }

    this.chatService.agregarMensajes( this.mensaje )
      .then( () => { console.log('Mensaje enviado!'); this.mensaje = ''; })
      .catch( (err) => console.log('Error en el envio', err));

  }

}
