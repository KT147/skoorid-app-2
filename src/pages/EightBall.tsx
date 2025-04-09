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
  
    const increaseStarterScore = () => {
      setStarterScore(starterScore + 1);
  
      if (selectActivePlayer === false) {
        setSelectActivePlayer(true);
      } else {
        setSelectActivePlayer(false);
      }
    };
  
    const decreaseStarterScore = () => {
      if (starterScore > 0) {
        setStarterScore(starterScore - 1);
      }
  
      if (selectActivePlayer === false) {
        setSelectActivePlayer(true);
      } else {
        setSelectActivePlayer(false);
      }
    };
  
    const increaseOpponentScore = () => {
      setOpponentScore(opponentScore + 1);
  
      if (selectActivePlayer === false) {
        setSelectActivePlayer(true);
      } else {
        setSelectActivePlayer(false);
      }
    };
  
    const decreaseOpponentScore = () => {
      if (opponentScore > 0) {
        setOpponentScore(opponentScore - 1);
      }
  
      if (selectActivePlayer === false) {
        setSelectActivePlayer(true);
      } else {
        setSelectActivePlayer(false);
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
      ).then((res) => res.json());
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
        <IonContent fullscreen>
          <IonCard>
          <IonText>
            <h2>{message}</h2>
          </IonText>
  
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {selectActivePlayer === false && (
              <IonImg src="/arrow.png" style={{ height: "30px" }} />
            )}
            <IonText>
              <h1>{starter}</h1>
            </IonText>
          </div>
  
          <IonText>
            <h1>{starterScore}</h1>
          </IonText>
  
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <IonButton
              onClick={increaseStarterScore}
              disabled={
                starterScore === Number(winnings) ||
                opponentScore === Number(winnings)
              }
              size="default"
            >
              +
            </IonButton>
            <IonButton
              onClick={decreaseStarterScore}
              disabled={
                starterScore === Number(winnings) ||
                opponentScore === Number(winnings)
              }
              size="default"
            >
              -
            </IonButton>
          </div>
  
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
            {selectActivePlayer === true && (
              <IonImg src="/arrow.png" style={{ height: "30px" }} />
            )}
            <IonText>
              <h1>{opponent}</h1>
            </IonText>
          </div>
  
          <IonText>
            <h1>{opponentScore}</h1>
          </IonText>
  
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <IonButton
              onClick={increaseOpponentScore}
              disabled={
                starterScore === Number(winnings) ||
                opponentScore === Number(winnings)
              }
              size="default"
            >
              +
            </IonButton>
            <IonButton
              onClick={decreaseOpponentScore}
              disabled={
                starterScore === Number(winnings) ||
                opponentScore === Number(winnings)
              }
              size="default"
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
  
          <IonButton shape="round" onClick={navigateToScore} color="primary">
            Lõpeta mäng ja salvesta tulemused
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }
  
  export default EightBall;