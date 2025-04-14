import { useState, useEffect } from "react"
import { usePlayers } from "../store/PlayerContext"
import { IonButton, IonContent, IonPage, IonCard, IonCardContent, IonText, IonIcon, IonHeader, IonToolbar, IonTitle, IonAlert } from "@ionic/react"
import { useHistory } from "react-router"
import { backspace } from "ionicons/icons"

function FourteenOne() {
  const {
    gameName,
    starter,
    opponent,
    winnings,
    setGameStartTime,
    setGameEndTime
  } = usePlayers()

  const uHistory = useHistory()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [history, setHistory] = useState<any[]>([])

  const [message, setMessage] = useState("")

  const [starterIsActive, setStarterIsActive] = useState(false)
  const [opponentIsActive, setOpponentIsActive] = useState(false)

  const [startingTable, setStartingTable] = useState(15)

  const [starterScore, setStarterScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)

  const [starterCurrentRun, setStarterCurrentRun] = useState(0)
  const [starterMaxRun, setStarterMaxRun] = useState(0)

  const [opponentCurrentRun, setOpponentCurrentRun] = useState(0)
  const [opponentMaxRun, setOpponentMaxRun] = useState(0)

  const [starterFoulCount, setStarterFoulCount] = useState(0)
  const [opponentFoulCount, setOpponentFoulCount] = useState(0)

  const [gameStartTime, setGameStartTimeLocal] = useState("")

  useEffect(() => {
    const startTime = new Date().toISOString()
    setGameStartTimeLocal(startTime)
    setGameStartTime(startTime)
  }, [setGameStartTime])

  useEffect(() => {
    localStorage.setItem("starter", starter)
  }, [starter])

  useEffect(() => {
    localStorage.setItem("opponent", opponent)
  }, [opponent])

  useEffect(() => {
    localStorage.setItem("winnings", winnings)
  }, [winnings])


  const saveHistory = () => {
    setHistory(prevHistory => [
      ...prevHistory,
      {
        startingTable,
        starterScore,
        opponentScore,
        starterCurrentRun,
        opponentCurrentRun,
        starterMaxRun,
        opponentMaxRun,
        starterFoulCount,
        opponentFoulCount
      }
    ])
  }

  const changeStarterToActive = () => {
    setStarterIsActive(true)
    setOpponentIsActive(false)
    setOpponentCurrentRun(0)
  }

  const changeOpponentToActive = () => {
    setStarterIsActive(false)
    setOpponentIsActive(true)
    setStarterCurrentRun(0)
  }

  const updateStarterScore = () => {
    saveHistory()
    const newScore = starterScore + 1
    setStarterScore(newScore)
    setStartingTable(prev => prev - 1)

    setStarterFoulCount(0)

    setStarterCurrentRun(prev => {
      const newRun = prev + 1
      if (newRun > starterMaxRun) setStarterMaxRun(newRun)
      return newRun
    })
    setOpponentCurrentRun(0)

    if (startingTable === 2) {
      setStartingTable(15)
    }

    if (newScore === Number(winnings)) {
      setMessage(starter + " võitis")
    }
  }

  const updateOpponentScore = () => {
    saveHistory()
    const newScore = opponentScore + 1
    setOpponentScore(newScore)
    setStartingTable(prev => prev - 1)

    setOpponentFoulCount(0)

    setOpponentCurrentRun(prev => {
      const newRun = prev + 1
      if (newRun > opponentMaxRun) setOpponentMaxRun(newRun)
      return newRun
    })
    setStarterCurrentRun(0)

    if (startingTable === 2) {
      setStartingTable(15)
    }

    if (newScore === Number(winnings)) {
      setMessage(opponent + " võitis")
    }
  }

  const starterFoul = () => {
    saveHistory()
    if (startingTable === 15 && starterScore === 0 && opponentScore === 0) {
      setStarterScore(prevScore => prevScore - 2)
    } else {
      setStarterScore(prevScore => prevScore - 1)
    }

    setStarterCurrentRun(0)

    setStarterFoulCount(prev => {
      const newCount = prev + 1
      if (newCount === 3) {
        setStarterScore(prev => prev - 15)
        return 0
      }
      return newCount
    })
  }

  const opponentFoul = () => {
    saveHistory()
    if (startingTable === 15 && starterScore === 0 && opponentScore === 0) {
      setOpponentScore(prevScore => prevScore - 2)
    } else {
      setOpponentScore(prevScore => prevScore - 1)
    }

    setOpponentCurrentRun(0)

    setOpponentFoulCount(prev => {
      const newCount = prev + 1
      if (newCount === 3) {
        setOpponentScore(prev => prev - 15)
        return 0
      }
      return newCount
    })
  }

  const undo = () => {
    if (history.length === 0) return

    const lastState = history[history.length - 1]
    setHistory(prevHistory => prevHistory.slice(0, -1))

    setStartingTable(lastState.startingTable)
    setStarterScore(lastState.starterScore)
    setOpponentScore(lastState.opponentScore)
    setStarterCurrentRun(lastState.starterCurrentRun)
    setOpponentCurrentRun(lastState.opponentCurrentRun)
    setStarterMaxRun(lastState.starterMaxRun)
    setOpponentMaxRun(lastState.opponentMaxRun)
    setStarterFoulCount(lastState.starterFoulCount)
    setOpponentFoulCount(lastState.opponentFoulCount)
  }

  const removeBall = () =>{
    saveHistory()
    setStartingTable(startingTable - 1)
  }

  const navigateToScore = () => {
    uHistory.push("/scores")
    const endTime = new Date().toISOString()
    setGameEndTime(endTime)

    const gameData = {
      gameName,
      starter,
      opponent,
      starterScore,
      opponentScore,
      starterMaxRun,
      opponentMaxRun,
      gameStartTime,
      gameEndTime: endTime
    }

    fetch("https://skoorid-database-default-rtdb.europe-west1.firebasedatabase.app/skoorid.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameData)
    })
      .then(res => res.json()).then(() => {
        window.location.reload()
      })
  }

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
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonText>
              <h2>{message}</h2>
              <div className="starting-table">{startingTable}</div>
              <div>Mäng käib {winnings} punktini</div><br />

              <IonButton onClick={removeBall} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>1 pall vähemaks</IonButton>
              <IonButton className="undo-btn" onClick={undo} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>
              <IonIcon icon={backspace} />
              </IonButton>
              <br /><br /><br />
              <IonCard>
                <IonCardContent>
                  <div onClick={changeStarterToActive} className={starterIsActive ? "active-player" : ""}>
                    <h1>{starter}</h1>
                    <h1>Skoor: {starterScore}</h1>
                    <div>Aktiivne punktiseeria: {starterCurrentRun}</div>
                    <div>Suurim punktiseeria: {starterMaxRun}</div>
                    <br />
                    {starterFoulCount === 2 && <div>Vigu järjest: {starterFoulCount}</div>}
                    <br />
                    {starterIsActive === true && <div>
                      <IonButton style={{marginRight:"20px"}} onClick={updateStarterScore} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>-</IonButton>
                      <IonButton onClick={starterFoul} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>Viga</IonButton>
                    </div>}
                  </div>

                  <div onClick={changeOpponentToActive} className={opponentIsActive ? "active-player" : ""}>
                    {opponentIsActive === true && <div>
                      <IonButton style={{marginRight:"20px"}} onClick={updateOpponentScore} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>-</IonButton>
                      <IonButton onClick={opponentFoul} disabled={starterScore === Number(winnings) || opponentScore === Number(winnings)}>Viga</IonButton>
                    </div>}
                    <br /><br />
                    <h1>{opponent}</h1>
                    <h1>Skoor: {opponentScore}</h1>
                    <div>Aktiivne punktiseeria: {opponentCurrentRun}</div>
                    <div>Suurim punktiseeria: {opponentMaxRun}</div>
                    {opponentFoulCount === 2 && <div>Vigu järjest: {opponentFoulCount}</div>}
                  </div>
                </IonCardContent>
              </IonCard>
            </IonText>
          </IonCardContent>
          <br /><br /><br /><br />
        </IonCard>
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
  )
}

export default FourteenOne