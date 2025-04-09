import { IonContent, IonPage } from '@ionic/react';
import { IonButton } from '@ionic/react';
import { useEffect, useState } from 'react';

interface Game {
  gameName: string;
  starter: string;
  opponent: string;
  starterScore: number;
  opponentScore: number;
  gameStartTime: string;
  gameEndTime: string;
  starterMaxRun?: number;
  opponentMaxRun?: number;
}

const Scores: React.FC = () => {
  

  useEffect(() => {
    fetch("https://skoorid-database-default-rtdb.europe-west1.firebasedatabase.app/skoorid.json")
      .then((res) => res.json())
      .then((json) => {
        const sortedGames: Game[] = Object.values(json || [])
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((game: any) => ({
            ...game,
            gameStartTime: new Date(game.gameStartTime),
            gameEndTime: new Date(game.gameEndTime)
          }))
          .sort((a, b) => b.gameEndTime.getTime() - a.gameEndTime.getTime());
        setGameHistory(sortedGames);
      });
  }, []);

  const [gameHistory, setGameHistory] = useState<Game[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<{ player1: string, player2: string } | null>(null);

  const filterGamesByPlayers = (player1:string, player2:string) => {
    return gameHistory.filter(game =>
      (game.starter.toLowerCase() === player1.toLowerCase() && game.opponent.toLowerCase() === player2.toLowerCase()) ||
      (game.starter.toLowerCase() === player2.toLowerCase() && game.opponent.toLowerCase() === player1.toLowerCase())
    )
  }

  const handleRowClick = (player1:string, player2:string) => {
    setSelectedPlayers({ player1, player2 })
  }

  const handleBackClick = () => {
    setSelectedPlayers(null)
  }

  const gamesToDisplay = selectedPlayers
  ? filterGamesByPlayers(selectedPlayers.player1, selectedPlayers.player2)
  : gameHistory

  return (
    <IonPage>
      <IonContent>
        <div style={{ padding: '20px' }}>

          <br />
          {selectedPlayers && (
            <IonButton onClick={handleBackClick} expand="full" color="secondary">Algseisu tagasi</IonButton>
          )}
          <br /><br />

          {!selectedPlayers && (
            <table>
              <thead>
                <tr>
                  <th>Mäng</th>
                  <th>Mängija 1</th>
                  <th>Mängija 2</th>
                  <th>Mängu kestus</th>
                </tr>
              </thead>
              <tbody>
                {gameHistory.map((game, index) => (
                  <tr key={index} onClick={() => handleRowClick(game.starter, game.opponent)}>
                    <td className="game-name">{game.gameName}</td>
                    <td className="game-player">
                      {game.starter}<br />
                      Skoor: {game.starterScore}<br />
                      {(game.gameName === "14-1" || game.gameName === "Snuuker") && (
                        <>
                          Suurim seeria: {game.starterMaxRun}
                        </>
                      )}
                    </td>
                    <td className="game-player">
                      {game.opponent}<br />
                      Skoor: {game.opponentScore}<br />
                      {(game.gameName === "14-1" || game.gameName === "Snuuker") && (
                        <>
                          Suurim seeria: {game.opponentMaxRun}
                        </>
                      )}
                    </td>
                    <td className="game-time">
                      {new Date(game.gameStartTime).toLocaleString()} - <br />
                      {new Date(game.gameEndTime).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedPlayers && (
            <div>
              <h3>{selectedPlayers.player1} vs {selectedPlayers.player2} mängud</h3>
              <table>
                <thead>
                  <tr>
                    <th>Mäng</th>
                    <th>Mängija 1</th>
                    <th>Mängija 2</th>
                    <th>Mängu kestus</th>
                  </tr>
                </thead>
                <tbody>
                  {gamesToDisplay.map((game, index) => (
                    <tr key={index}>
                      <td className="game-name">{game.gameName}</td>
                      <td className="game-player">
                        {game.starter}<br />
                        Skoor: {game.starterScore}<br />
                        {(game.gameName === "14-1" || game.gameName === "Snuuker") && (
                          <>
                            Suurim seeria: {game.starterMaxRun}
                          </>
                        )}
                      </td>
                      <td className="game-player">
                        {game.opponent}<br />
                        Skoor: {game.opponentScore}<br />
                        {(game.gameName === "14-1" || game.gameName === "Snuuker") && (
                          <>
                            Suurim seeria: {game.opponentMaxRun}
                          </>
                        )}
                      </td>
                      <td className="game-time">
                        {new Date(game.gameStartTime).toLocaleString()} - <br />
                        {new Date(game.gameEndTime).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Scores;