import * as signalR from '@microsoft/signalr';

let connection: signalR.HubConnection | null = null;

export async function initConnection(token: string) {
  if (connection && connection.state === "Connected") {
    console.log("🛡️ Reusing existing SignalR connection");
    return;
  }

  if (!connection || connection.state === "Disconnected") {
    console.log("⏳ SignalR is connecting. Waiting...");
    connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5195/chatHub", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    await connection.start();
  }
}

export function getConnection() {
  return connection;
}