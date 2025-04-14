import {
  IonButton,
  IonContent,
  IonPage,
  IonText,
  IonImg,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonAlert,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { usePlayers } from "../store/PlayerContext";
import { useHistory } from "react-router";

function EightBall() {
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

  const [selectActivePlayer, setSelectActivePlayer] = useState(false);
  const [message, setMessage] = useState("");
  const [gameStartTime, setGameStartTimeLocal] = useState("");

  useEffect(() => {
    const startTime = new Date().toISOString();
    setGameStartTimeLocal(startTime);
    setGameStartTime(startTime);
  }, [setGameStartTime]);

  useEffect(() => {
    localStorage.setItem("starter", starter);
  }, [starter]);

  useEffect(() => {
    localStorage.setItem("opponent", opponent);
  }, [opponent]);

  useEffect(() => {
    localStorage.setItem("winnings", winnings);
  }, [winnings]);

  const togglePlayer = () => {
    setSelectActivePlayer((prev) => !prev);
  };

  const increaseStarterScore = () => {
    setStarterScore(starterScore + 1);
    togglePlayer();
  };

  const decreaseStarterScore = () => {
    if (starterScore > 0) {
      setStarterScore(starterScore - 1);
    }
    togglePlayer();
  };

  const increaseOpponentScore = () => {
    setOpponentScore(opponentScore + 1);
    togglePlayer();
  };

  const decreaseOpponentScore = () => {
    if (opponentScore > 0) {
      setOpponentScore(opponentScore - 1);
    }
    togglePlayer();
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
    )
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <IonPage>
      <IonHeader className="score-card">
        <IonToolbar>
          <br />
          <br />
          <IonTitle>{gameName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonText>
            <h2>{message}</h2>
          </IonText>

          <div className="scores-container">
            <div className="score-box">
              <div className="player-header">
                <div className="arrow-wrapper">
                  <IonImg
                    src="/arrow.png"
                    className={`arrow-icon ${
                      selectActivePlayer === false ? "" : "hidden"
                    }`}
                  />
                </div>
                <IonText>
                  <h1>{starter}</h1>
                </IonText>
              </div>
              <IonText>
                <h1>{starterScore}</h1>
              </IonText>
              <div className="score-buttons">
                <IonButton
                  onClick={increaseStarterScore}
                  disabled={
                    starterScore === Number(winnings) ||
                    opponentScore === Number(winnings)
                  }
                >
                  +
                </IonButton>
                <IonButton
                  onClick={decreaseStarterScore}
                  disabled={
                    starterScore === Number(winnings) ||
                    opponentScore === Number(winnings)
                  }
                >
                  -
                </IonButton>
              </div>
            </div>

            <div className="score-box">
              <div className="player-header">
                <div className="arrow-wrapper">
                  <IonImg
                    src="/arrow.png"
                    className={`arrow-icon ${
                      selectActivePlayer === true ? "" : "hidden"
                    }`}
                  />
                </div>
                <IonText>
                  <h1>{opponent}</h1>
                </IonText>
              </div>
              <IonText>
                <h1>{opponentScore}</h1>
              </IonText>
              <div className="score-buttons">
                <IonButton
                  onClick={increaseOpponentScore}
                  disabled={
                    starterScore === Number(winnings) ||
                    opponentScore === Number(winnings)
                  }
                >
                  +
                </IonButton>
                <IonButton
                  onClick={decreaseOpponentScore}
                  disabled={
                    starterScore === Number(winnings) ||
                    opponentScore === Number(winnings)
                  }
                >
                  -
                </IonButton>
              </div>
            </div>
          </div>
          <br />
          <br />
        </IonCard>

        <IonButton
          className="end-game-btn"
          id="present-alert"
          shape="round"
          color="primary"
        >
          Lõpeta mäng
        </IonButton>
        <IonAlert
          header="Kas salvestada tulemused?"
          trigger="present-alert"
          buttons={[
            {
              text: "TAGASI",
              role: "cancel",
              handler: () => {
                console.log("Alert canceled");
              },
            },
            {
              text: "EI",
              role: "confirm",
              handler: () => {
                history.push("/");
                window.location.reload();
              },
            },
            {
              text: "JAH",
              role: "confirm",
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

export default EightBall;
