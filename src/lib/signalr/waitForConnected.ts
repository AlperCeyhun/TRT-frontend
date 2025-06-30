export async function waitForConnected(connection: signalR.HubConnection, timeout = 5000) {
  const start = Date.now();
  while (connection.state !== "Connected") {
    console.log("Waiting for connection to be 'Connected'... start:", start);
    if (Date.now() - start > timeout) {
      throw new Error("Timed out waiting for connection to be 'Connected'");
    }
    await new Promise(res => setTimeout(res, 100));
  }
}