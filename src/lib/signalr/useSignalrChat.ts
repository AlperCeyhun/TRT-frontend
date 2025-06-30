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

    const setupSignalR = async () => {
      try {
        console.log("🔌 Connecting with token:", token);
        await initConnection(token);

        const connection = getConnection();
        if (!connection) return;
        console.log("✅ SignalR connection established");
        
        await waitForConnected(connection);

        const userId = getUserid();
        if (connection.state === "Connected") {
          await connection.invoke("RegisterUser", userId);
          console.log("🔗 User registered with ID:", userId);
          console.log("Client connectionId:", connection.connectionId);
        } else {
          console.warn("⚠️ Connection not ready. Couldn't register user.");
        }

        connection.off("ReceiveMessage");
        
        connection.on("ReceiveMessage", (message: string) => {
          console.log("📥 Received via SignalR:", message);
          if (isMounted) {
            onMessageReceived(message);
          }
        });

      } catch (err) {
        console.error("❌ SignalR connection failed:", err);
      }
    };

    setupSignalR();

    return () => {
      isMounted = false;
      const connection = getConnection();
      connection?.off("ReceiveMessage");
    };
  }, [token, onMessageReceived]);
}