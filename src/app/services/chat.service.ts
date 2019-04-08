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

    this.itemsCollection = this.afs.collection<Mensaje>('chats');

    return this.itemsCollection.valueChanges()
      .pipe(map( (mensajes: Mensaje[]) => {
        console.log('recibiendo mensajes en el pipeee');
        console.log(mensajes[1]);
        this.chats = mensajes;
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
