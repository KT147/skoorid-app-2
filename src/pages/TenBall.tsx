import { useEffect, useState } from "react";
import { usePlayers } from "../store/PlayerContext";
import {
  IonButton,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
  IonCard,
  IonAlert,
} from "@ionic/react";
import { useHistory } from "react-router";

function TenBall() {
  const {
    gameName,
    starter,
    opponent,
    winnings,
    setGameStartTime,
    setGameEndTime,
  } = usePlayers();

  const history = useHistory();

  const [starterScore, setStarterScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const [selectActivePlayer, setSelectActivePlayer] = useState(starter);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const [message, setMessage] = useState("");

  const [gameStartTime, setGameStartTimeLocal] = useState("");

  useEffect(() => {
    const startTime = new Date().toISOString();
    setGameStartTimeLocal(startTime);
    setGameStartTime(startTime);
  }, [setGameStartTime]);

  useEffect(() => {
    const savedCheckboxValue = localStorage.getItem("checkboxChecked");
    if (savedCheckboxValue !== null) {
      setCheckboxChecked(savedCheckboxValue === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("starter", starter);
  }, [starter]);

  useEffect(() => {
    localStorage.setItem("opponent", opponent);
  }, [opponent]);

  useEffect(() => {
    localStorage.setItem("winnings", winnings);
  }, [winnings]);

  const increaseScore = (player: string) => {
    if (player === starter) {
      setStarterScore((prevScore) => prevScore + 1);
    } else {
      setOpponentScore((prevScore) => prevScore + 1);
    }

    if (checkboxChecked) {
      setSelectActivePlayer(player);
    } else {
      setSelectActivePlayer((prevPlayer) =>
        prevPlayer === starter ? opponent : starter
      );
    }
  };

  const decreaseScore = (player: string) => {
    if (player === starter && starterScore > 0) {
      setStarterScore((prevScore) => prevScore - 1);
    } else if (player === opponent && opponentScore > 0) {
      setOpponentScore((prevScore) => prevScore - 1);
    }

    if (checkboxChecked) {
      setSelectActivePlayer(player);
    } else {
      setSelectActivePlayer((prevPlayer) =>
        prevPlayer === starter ? opponent : starter
      );
    }
  };

  const checkWinner = () => {
    if (starterScore === Number(winnings)) {
      setMessage(`${starter} võitis!`);
    } else if (opponentScore === Number(winnings)) {
      setMessage(`${opponent} võitis!`);
    }
  };

  useEffect(() => {
    checkWinner();
  }, [starterScore, opponentScore]);

  const navigateToScore = () => {
    history.push("/scores");
    const endTime = new Date().toISOString();
    setGameEndTime(endTime);

    const gameData = {
      gameName,
      starter,
      opponent,
      starterScore,
      opponentScore,
      gameStartTime,
      gameEndTime: endTime,
    };

    fetch(
      "https://skoorid-database-default-rtdb.europe-west1.firebasedatabase.app/skoorid.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      }
    ).then((res) => res.json()).then(() => {
      window.location.reload()
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <br />
          <br />
          <IonTitle>{gameName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <br />
      <br />
      <br />
      <br />
      <br />
      <IonContent>
      <IonCard>
        <div style={{ padding: "20px" }}>
          <h2>{message}</h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {selectActivePlayer === starter && (
              <IonImg src="/arrow.png" style={{ height: "30px" }} />
            )}
            <h1>{starter}</h1>
          </div>

          <h1>{starterScore}</h1>
          <IonButton
            onClick={() => increaseScore(starter)}
            disabled={
              starterScore === Number(winnings) ||
              opponentScore === Number(winnings)
            }
          >
            +
          </IonButton>
          <IonButton
            onClick={() => decreaseScore(starter)}
            disabled={
              starterScore === Number(winnings) ||
              opponentScore === Number(winnings)
            }
          >
            -
          </IonButton>
          <br />
          <br />
          <br />
          <br />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {selectActivePlayer === opponent && (
              <IonImg src="/arrow.png" style={{ height: "30px" }} />
            )}
            <h1>{opponent}</h1>
          </div>

          <h1>{opponentScore}</h1>
          <IonButton
            onClick={() => increaseScore(opponent)}
            disabled={
              starterScore === Number(winnings) ||
              opponentScore === Number(winnings)
            }
          >
            +
          </IonButton>
          <IonButton
            onClick={() => decreaseScore(opponent)}
            disabled={
              starterScore === Number(winnings) ||
              opponentScore === Number(winnings)
            }
          >
            -
          </IonButton>
          </div>
          <br />
          <br />
          <br />
          </IonCard>
          <br />
          <br />
          <br />

          <IonButton id="present-alert" shape="round" color="primary">
            Lõpeta mäng
          </IonButton>
          <IonAlert
        header="Kas salvestada tulemused?"
        trigger="present-alert"
        buttons={[
          {
            text: 'TAGASI',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'EI',
            role: 'confirm',
            handler: () => {
            history.push("/home-page");
            window.location.reload()
            },
          },
          {
            text: 'JAH',
            role: 'confirm',
            handler: () => {
              navigateToScore();
            },
          },
        ]}
      ></IonAlert>
      </IonContent>
    </IonPage>
  );
}

export default TenBall;