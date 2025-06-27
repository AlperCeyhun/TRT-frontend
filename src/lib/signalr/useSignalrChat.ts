import { useEffect } from "react";
import { initConnection, getConnection } from "@/lib/signalr/signalrConnection";

export function useSignalRChat(
  token: string,
  onMessageReceived: (message: string) => void
) {
  useEffect(() => {
    let isMounted = true;

    if (!token) return;

    initConnection(token)
      .then(() => {
        const connection = getConnection();

        if (!connection) return;

        connection.on("ReceiveMessage", (message: string) => {
          if (isMounted) {
            onMessageReceived(message);
          }
        });
      })
      .catch((err) => {
        console.error("SignalR connection failed:", err);
      });

    return () => {
      isMounted = false;
      const connection = getConnection();
      connection?.off("ReceiveMessage");
    };
    console.log("UseSignalrChat triggered.");
  }, [token, onMessageReceived]);
}