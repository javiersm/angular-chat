import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) {

  }

  cargarMensajes() {

    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc')
                                                                            .limit(5) );

    return this.itemsCollection.valueChanges()
      .pipe(map( (mensajes: Mensaje[]) => {
        console.log('recibiendo mensajes en el pipeee');
        console.log(mensajes[1]);

        this.chats = [];

        // Ordenar los mensajes para que se muestren bien en pantalla
        for (let mensaje of mensajes) {
          this.chats.unshift( mensaje );
        }

        // this.chats = mensajes;
        // return mensajes;
      }));
  }


  agregarMensajes( texto: string ) {

    const mensaje: Mensaje = {
      nombre: 'Javi Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add( mensaje );

  }


}
