// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Connect to the Socket.IO server
    this.socket = io('http://localhost:3000'); // Adjust as necessary
  }

  // Listen for tank data updates
  listenForTankData(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('tankData', (data) => {
        subscriber.next(data);
      });
    });
  }
}
