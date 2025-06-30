import { useEffect } from "react";
import { initConnection, getConnection } from "@/lib/signalr/signalrConnection";
import { getUserid } from "../user/getUserid";
import { waitForConnected } from "@/lib/signalr/waitForConnected";

export function useSignalRChat(
  token: string,
  onMessageReceived: (message: string) => void
) {
  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    // Define the handler ONCE so we can remove it later
    const handler = (message: string) => {
      if (isMounted) {
        onMessageReceived(message);
      }
    };

    const setupSignalR = async () => {
      try {
        await initConnection(token);

        const connection = getConnection();
        if (!connection) return;

        await waitForConnected(connection);

        const userId = getUserid();
        if (connection.state === "Connected") {
          await connection.invoke("RegisterUser", userId);
        }

        // Remove previous handler, then add the new one
        connection.off("ReceiveMessage", handler);
        connection.on("ReceiveMessage", handler);

      } catch (err) {
        console.error("❌ SignalR connection failed:", err);
      }
    };

    setupSignalR();

    return () => {
      isMounted = false;
      const connection = getConnection();
      connection?.off("ReceiveMessage", handler);
    };
  }, [token, onMessageReceived]);
}