import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje = '';
  elemento: any;

  constructor( public chatService: ChatService ) {
    this.chatService.cargarMensajes()
                      .subscribe( (mensajes: any) => {
                        console.log('recibiendo mensajes');
                        console.log(mensajes);

                        // Esto es para darle un poco de tiempo y que pueda hacer scroll y no falle
                        setTimeout(() => {
                          this.elemento.scrollTop = this.elemento.scrollHeight;
                        }, 20);

                      });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
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
