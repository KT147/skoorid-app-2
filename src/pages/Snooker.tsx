import { useState, useEffect } from "react";
import { usePlayers } from "../store/PlayerContext";
import { IonButton, IonContent, IonPage, IonIcon, IonHeader, IonToolbar, IonTitle, IonCard, IonAlert } from '@ionic/react';
import {  backspace } from 'ionicons/icons';
import { useHistory } from "react-router";

type Button = {
  backgroundColor: string;
  color: string;
  value: number;
};

type HistoryState = {
    starterPoints: number;
    opponentPoints: number;
    starterCurrentRun: number[];
    opponentCurrentRun: number[];
    starterMaxRun: number;
    opponentMaxRun: number;
    totalPoints: number | undefined;  
  };

function Snooker() {
  const {
    gameName,
    starter,
    opponent,
    winnings,
    setGameStartTime,
    setGameEndTime,
  } = usePlayers();

  const buttons: Button[] = [
    { backgroundColor: "red", color: "white", value: 1 },
    { backgroundColor: "black", color: "white", value: 7 },
    { backgroundColor: "pink", color: "black", value: 6 },
    { backgroundColor: "blue", color: "white", value: 5 },
    { backgroundColor: "#8B4513", color: "white", value: 4 },
    { backgroundColor: "green", color: "white", value: 3 },
    { backgroundColor: "yellow", color: "black", value: 2 }
  ];

  const [history, setHistory] = useState<HistoryState[]>([]);
  const uHistory = useHistory()

  const [message, setMessage] = useState<string>("");
  const [radioChoise, setRadioChoice] = useState<number | undefined>();

  const [starterIsActive, setStarterIsActive] = useState<boolean>(true);
  const [opponentIsActive, setOpponentIsActive] = useState<boolean>(false);

  const [starterPoints, setStarterPoints] = useState<number>(0);
  const [opponentPoints, setOpponentPoints] = useState<number>(0);

  const [starterScore, setStarterScore] = useState<number>(0);
  const [opponentScore, setOpponentScore] = useState<number>(0);

  const [totalPoints, setTotalPoints] = useState<number | undefined>();

  const [starterCurrentRun, setStarterCurrentRun] = useState<number[]>([0]);
  const [starterMaxRun, setStarterMaxRun] = useState<number>(0);

  const [opponentCurrentRun, setOpponentCurrentRun] = useState<number[]>([0]);
  const [opponentMaxRun, setOpponentMaxRun] = useState<number>(0);

  const [gameStartTime, setGameStartTimeLocal] = useState<string>("");

  useEffect(() => {
    const startTime = new Date().toISOString();
    setGameStartTimeLocal(startTime);
    setGameStartTime(startTime);
  }, [setGameStartTime]);

  useEffect(() => {
    const savedRadioChoice = localStorage.getItem("radioChoise");
    if (savedRadioChoice !== null) {
      setRadioChoice(Number(savedRadioChoice));
    }
    resetTotalPoints();
  }, [radioChoise]);

  useEffect(() => {
    localStorage.setItem("starter", starter);
  }, [starter]);

  useEffect(() => {
    localStorage.setItem("opponent", opponent);
  }, [opponent]);

  useEffect(() => {
    localStorage.setItem("winnings", winnings);
  }, [winnings]);

  const saveHistory = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      {
        starterPoints,
        opponentPoints,
        starterCurrentRun: [...starterCurrentRun],
        opponentCurrentRun: [...opponentCurrentRun],
        starterMaxRun,
        opponentMaxRun,
        totalPoints,
      },
    ]);
  };

  const changeStarterToActive = () => {
    setStarterIsActive(true);
    setOpponentIsActive(false);
    setOpponentCurrentRun([]);
  };

  const changeOpponentToActive = () => {
    setStarterIsActive(false);
    setOpponentIsActive(true);
    setStarterCurrentRun([]);
  };

  const raiseScore = (player: string, btn: Button) => {
    saveHistory();

    if (btn.value === 1) {
      setTotalPoints(totalPoints! - 8);
    }

    if (totalPoints === 27 && btn.value === 2) setTotalPoints(25);
    if (totalPoints === 25 && btn.value === 3) setTotalPoints(22);
    if (totalPoints === 22 && btn.value === 4) setTotalPoints(18);
    if (totalPoints === 18 && btn.value === 5) setTotalPoints(13);
    if (totalPoints === 13 && btn.value === 6) setTotalPoints(7);
    if (totalPoints === 7 && btn.value === 7) setTotalPoints(0);

    if (player === starter) {
      setStarterPoints(starterPoints + btn.value);
      setStarterCurrentRun((prevRun) => {
        const newRun = [...prevRun, btn.value];
        const currentRunSum = newRun.reduce((acc, val) => acc + val, 0);
        setStarterMaxRun((prevMax) => Math.max(prevMax, currentRunSum));
        return newRun;
      });
    }

    if (player === opponent) {
      setOpponentPoints(opponentPoints + btn.value);
      setOpponentCurrentRun((prevRun) => {
        const newRun = [...prevRun, btn.value];
        const currentRunSum = newRun.reduce((acc, val) => acc + val, 0);
        setOpponentMaxRun((prevMax) => Math.max(prevMax, currentRunSum));
        return newRun;
      });
    }
  };

  const undo = () => {
    if (history.length === 0) return;

    const lastState = history[history.length - 1];
    setHistory((prevHistory) => prevHistory.slice(0, -1));

    setStarterPoints(lastState.starterPoints);
    setOpponentPoints(lastState.opponentPoints);
    setStarterCurrentRun(lastState.starterCurrentRun);
    setOpponentCurrentRun(lastState.opponentCurrentRun);
    setStarterMaxRun(lastState.starterMaxRun);
    setOpponentMaxRun(lastState.opponentMaxRun);
    setTotalPoints(lastState.totalPoints);
  };

  const freeBall = () => {
    setTotalPoints(totalPoints! + 8);
  };

  const resetTotalPoints = () => {
    if (radioChoise === 15) {
      setTotalPoints(147);
    } else if (radioChoise === 10) {
      setTotalPoints(107);
    } else if (radioChoise === 6) {
      setTotalPoints(75);
    }
  };

  const newFrame = () => {
    if (starterPoints > opponentPoints) {
      setStarterScore(starterScore + 1);
    } else {
      setOpponentScore(opponentScore + 1);
    }

    if (starterIsActive === true) {
      setStarterIsActive(false);
      setOpponentIsActive(true);
    } else {
      setStarterIsActive(true);
      setOpponentIsActive(false);
    }

    setStarterPoints(0);
    setStarterCurrentRun([]);
    setOpponentPoints(0);
    setOpponentCurrentRun([]);
    resetTotalPoints();
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
  }, [starterScore, opponentScore, winnings]);

  const navigateToScore = () => {
    uHistory.push("/scores");
    const endTime = new Date().toISOString();
    setGameEndTime(endTime);

    const gameData = {
      gameName,
      starter,
      opponent,
      starterScore,
      opponentScore,
      starterMaxRun,
      opponentMaxRun,
      gameStartTime,
      gameEndTime: endTime,
    };

    fetch("https://skoorid-database-default-rtdb.europe-west1.firebasedatabase.app/skoorid.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    }).then((res) => res.json()).then(() => {
      window.location.reload()
    })
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
      <IonContent>
      <IonCard>
        <div style={{ padding: '20px' }}>
          <h2>{message}</h2>
          <div>Punkte laual: {totalPoints}</div>
          <div>Punktide vahe: {Math.abs(starterPoints - opponentPoints)}</div>
          <br />

          <IonButton onClick={undo} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>
            <IonIcon icon={backspace} />
          </IonButton>

          <div onClick={changeStarterToActive} style={{ backgroundColor: starterIsActive ? "#F1C40F" : "" }}>
            <h1>{starter}</h1>
            <h1>Skoor: {starterScore}</h1>
            {starterIsActive &&
              buttons.map((btn, index) => (
                <IonButton
                  onClick={() => raiseScore(starter, btn)}
                  key={index}
                  style={{
                    '--background': btn.backgroundColor,
                    color: btn.color,
                    borderRadius: "50%",
                    height: "35px",
                  }}
                  disabled={totalPoints === 27 && btn.value === 1 || starterScore === Number(winnings) || opponentScore === Number(winnings) || totalPoints === 0}
                >
                  {btn.value}
                </IonButton>
              ))}
            {starterIsActive && <IonButton onClick={freeBall} style={{ padding: "10px 5px" }} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>Vaba pall</IonButton>}
            <h1>Punktid: {starterPoints}</h1>
            <div>Aktiivne punktiseeria: {starterCurrentRun.reduce((acc, val) => acc + val, 0)}</div>
            <div>Suurim punktiseeria: {starterMaxRun}</div>
          </div>

          <div onClick={changeOpponentToActive} style={{ backgroundColor: opponentIsActive ? "#F1C40F" : '' }}>
            <h1>{opponent}</h1>
            <h1>Skoor: {opponentScore}</h1>
            {opponentIsActive &&
              buttons.map((btn, index) => (
                <IonButton
                  onClick={() => raiseScore(opponent, btn)}
                  key={index}
                  style={{
                    '--background': btn.backgroundColor,
                    color: btn.color,
                    borderRadius: "50%",
                    height: "45px",
                  }}
                  disabled={totalPoints === 27 && btn.value === 1 || starterScore === Number(winnings) || opponentScore === Number(winnings) || totalPoints === 0}
                >
                  {btn.value}
                </IonButton>
              ))}
            {opponentIsActive && <IonButton onClick={freeBall} style={{ padding: "10px 5px" }} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>Vaba pall</IonButton>}
            <h1>Punktid: {opponentPoints}</h1>
            <div>Aktiivne punktiseeria: {opponentCurrentRun.reduce((acc, val) => acc + val, 0)}</div>
            <div>Suurim punktiseeria: {opponentMaxRun}</div>
          </div>
          </div>
          </IonCard>

          <br />
          {totalPoints! < Math.abs(starterPoints - opponentPoints) && <IonButton onClick={newFrame}>Lõpeta freim</IonButton>}

          <br /><br />
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
            uHistory.push("/");
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

export default Snooker;