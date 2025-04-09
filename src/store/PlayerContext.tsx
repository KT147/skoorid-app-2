import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
  } from "react";
  
  type PlayerContextType = {
    players: string[];
    addPlayer: (name: string) => void;
    removePlayer: (name: string) => void;
    gameName: string;
    setGameName: (value: string) => void;
    starterMaxRun: string;
    setStarterMaxRun: (value: string) => void;
    opponentMaxRun: string;
    setOpponentMaxRun: (value: string) => void;
    gameStartTime: string;
    setGameStartTime: (value: string) => void;
    gameEndTime: string;
    setGameEndTime: (value: string) => void;
    starter: string;
    setStarter: (value: string) => void;
    opponent: string;
    setOpponent: (value: string) => void;
    winnings: string;
    setWinnings: (value: string) => void;
  };
  
  const PlayerContext = createContext<PlayerContextType | undefined>(undefined);
  
  export const usePlayers = () => {
    const context = useContext(PlayerContext);
    if (!context) {
      throw new Error("usePlayers peab olema PlayerProvideri sees!");
    }
    return context;
  };

  type Props = {
    children: ReactNode;
  };
  
  export const PlayerProvider: React.FC<Props> = ({ children }) => {
    const [players, setPlayers] = useState<string[]>(() => {
      const stored = localStorage.getItem("players");
      return stored ? JSON.parse(stored) : [];
    });
  
    const [starter, setStarter] = useState(localStorage.getItem("starter") || "");
    const [opponent, setOpponent] = useState(localStorage.getItem("opponent") || "");
    const [starterMaxRun, setStarterMaxRun] = useState(localStorage.getItem("starterMaxRun") || "");
    const [opponentMaxRun, setOpponentMaxRun] = useState(localStorage.getItem("opponentMaxRun") || "");
    const [winnings, setWinnings] = useState(localStorage.getItem("winnings") || "");
    const [gameStartTime, setGameStartTime] = useState(localStorage.getItem("gameStartTime") || "");
    const [gameEndTime, setGameEndTime] = useState(localStorage.getItem("gameEndTime") || "");
    const [gameName, setGameName] = useState(localStorage.getItem("gameName") || "");
  
    const addPlayer = (name: string) => {
      const updated = [...players, name];
      setPlayers(updated);
      localStorage.setItem("players", JSON.stringify(updated));
    };

    const removePlayer = (name: string) => {
      const updatedPlayers = players.filter((player) => player !== name)
      setPlayers(updatedPlayers);
      localStorage.setItem('players', JSON.stringify(updatedPlayers))
    };
  
    useEffect(() => localStorage.setItem("players", JSON.stringify(players)), [players]);
    useEffect(() => localStorage.setItem("starter", starter), [starter]);
    useEffect(() => localStorage.setItem("opponent", opponent), [opponent]);
    useEffect(() => localStorage.setItem("starterMaxRun", starterMaxRun), [starterMaxRun]);
    useEffect(() => localStorage.setItem("opponentMaxRun", opponentMaxRun), [opponentMaxRun]);
    useEffect(() => localStorage.setItem("winnings", winnings), [winnings]);
    useEffect(() => localStorage.setItem("gameStartTime", gameStartTime), [gameStartTime]);
    useEffect(() => localStorage.setItem("gameEndTime", gameEndTime), [gameEndTime]);
    useEffect(() => localStorage.setItem("gameName", gameName), [gameName]);
  
    return (
      <PlayerContext.Provider
        value={{
          players,
          addPlayer,
          removePlayer,
          gameName,
          setGameName,
          starterMaxRun,
          setStarterMaxRun,
          opponentMaxRun,
          setOpponentMaxRun,
          gameStartTime,
          setGameStartTime,
          gameEndTime,
          setGameEndTime,
          starter,
          setStarter,
          opponent,
          setOpponent,
          winnings,
          setWinnings,
        }}
      >
        {children}
      </PlayerContext.Provider>
    );
  };
  