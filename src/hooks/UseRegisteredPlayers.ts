import { useState, useEffect } from "react";

const useRegisteredPlayers = () => {
  const [registeredPlayers, setRegisteredPlayers] = useState<string[]>([]);

  useEffect(() => {
    // Creating broadcast channel for receiving messages
    const playerBroadcastChannel = new BroadcastChannel("players");
    const loadPlayers = async () => {
      // Getting player list from local storage
      let players: string[] =
        (await localStorage.getItem("players")?.split(",")) ?? [];
      setRegisteredPlayers(players);
      // Updating registered players when message is received from broadcast channel
      playerBroadcastChannel.onmessage = async (message) => {
        // Getting initial players list from shared local storage
        players = (await localStorage.getItem("players")?.split(",")) ?? [];
        // Push the player in players array if the player is not already present in the list
        if (!players.includes(message.data)) {
          players.push(message.data);
        }
        // Update the local storage for players
        await localStorage.setItem("players", players.join(","));
        setRegisteredPlayers(players);
      };
    };
    loadPlayers();
  }, []);

  return registeredPlayers;
};

export default useRegisteredPlayers;
