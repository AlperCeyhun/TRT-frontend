import * as signalR from '@microsoft/signalr';

let connection: signalR.HubConnection | null = null;

export function initConnection(token: string) {
  connection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5195/chatHub', {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();

  return connection.start();
}

export function getConnection() {
  return connection;
}