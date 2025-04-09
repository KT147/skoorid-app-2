import { IonCheckbox, IonContent, IonPage } from '@ionic/react';
import { IonButton, IonInput, IonSelect, IonSelectOption,} from '@ionic/react';
import { usePlayers } from "../store/PlayerContext"
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';


const HomePage: React.FC = () => {


  const { setGameName, players, starter, setStarter, opponent, setOpponent, winnings, setWinnings } = usePlayers()

  const [fourteenOne, setFourteenOne] = useState(false)
  const [eightBall, setEightBall] = useState(false)
  const [nineBall, setNineBall] = useState(false)
  const [tenBall, setTenBall] = useState(false)
  const [snooker, setSnooker] = useState(false)

  const history = useHistory()

  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioChoise, setRadioChoice] = useState(15)

  useEffect(() => {
      const savedCheckboxValue = localStorage.getItem("checkboxChecked")
      if (savedCheckboxValue !== null) {
          setCheckboxChecked(savedCheckboxValue === "true")
      } else {
          setCheckboxChecked(false)
      }
  }, [])

  useEffect(() => {
      const savedRadioChoice = localStorage.getItem("radioChoise");
      if (savedRadioChoice !== null) {
        setRadioChoice(Number(savedRadioChoice))
      }
    }, [])

  const playFourteenOne = () => {
      setGameName ("14-1")
      setFourteenOne(true)
      setEightBall(false)
      setNineBall(false)
      setTenBall(false)
      setSnooker(false)
  }

  const navigateToEight = () => {
      localStorage.setItem("starter", starter)
      localStorage.setItem("opponent", opponent)
      localStorage.setItem("winnings", winnings)
      history.push ("/eight-ball")
  }


  const playEightBall = () => {
      setGameName ("8-pall")
      setFourteenOne(false)
      setEightBall(true)
      setNineBall(false)
      setTenBall(false)
      setSnooker(false)
  }

  const navigateToNine = () => {
      localStorage.setItem("starter", starter)
      localStorage.setItem("opponent", opponent)
      localStorage.setItem("winnings", winnings)
      history.push ("/nine-ball")
  }

  const playNineBall = () => {
      setGameName ("9-pall")
      setFourteenOne(false)
      setEightBall(false)
      setNineBall(true)
      setTenBall(false)
      setSnooker(false)
  }

  const navigateToTen = () => {
      localStorage.setItem("starter", starter)
      localStorage.setItem("opponent", opponent)
      localStorage.setItem("winnings", winnings)
      history.push ("/ten-ball")
  }

  const playTenBall = () => {
      setGameName ("10-pall")
      setFourteenOne(false)
      setEightBall(false)
      setNineBall(false)
      setTenBall(true)
      setSnooker(false)
  }

  const navigateToSnooker = () => {
      localStorage.setItem("starter", starter)
      localStorage.setItem("opponent", opponent)
      localStorage.setItem("winnings", winnings)
      history.push ("/snooker")
  }


  const playSnooker = () => {
      setGameName ("Snuuker")
      setFourteenOne(false)
      setEightBall(false)
      setNineBall(false)
      setTenBall(false)
      setSnooker(true)
  }

  const navigateToFourteenOne = () => {
      localStorage.setItem("starter", starter)
      localStorage.setItem("opponent", opponent)
      localStorage.setItem("winnings", winnings)
      history.push ("/fourteen-one")
  }


  const handleCheckboxChange = (e: CustomEvent) => {
    const checked = e.detail.checked;
    setCheckboxChecked(checked);
    localStorage.setItem("checkboxChecked", checked.toString());
  };
  
  const handleRadioChange = (e: CustomEvent) => {
    const value = Number(e.detail.value); 
    setRadioChoice(value);
    localStorage.setItem("radioChoise", value.toString());
  };


  return (
    <IonPage>
      <br /><br /><br />

      <IonContent fullscreen>
        <div>
          <h3>Vali alustav mängija</h3>
          <IonSelect className='ion-select-first' value={starter} onIonChange={(e) => setStarter(e.detail.value)}>
            <IonSelectOption value="" disabled>-- Vali mängija --</IonSelectOption>
            {players.map((player, i) => (
              <IonSelectOption key={i} value={player}>
                {player}
              </IonSelectOption>
            ))}
          </IonSelect>

          <h3>Vali vastane</h3>
          <IonSelect className='ion-select-second' value={opponent} onIonChange={(e) => setOpponent(e.detail.value)}>
            <IonSelectOption value="" disabled>-- Vali mängija --</IonSelectOption>
            {players.map((player, i) => (
              <IonSelectOption key={i} value={player}>
                {player}
              </IonSelectOption>
            ))}
          </IonSelect>

          <br /><br />
          <h3>Vali mäng</h3>
          <IonButton className='game-button' onClick={playFourteenOne}>14.1</IonButton>
          <IonButton className='game-button'  onClick={playEightBall}>8-pall</IonButton>
          <IonButton className='game-button'  onClick={playNineBall}>9-pall</IonButton>
          <br />
          <IonButton className='game-button'  onClick={playTenBall}>10-pall</IonButton>
          <IonButton className='game-button'  onClick={playSnooker}>Snuuker</IonButton>

          {fourteenOne === true &&
            <div>
              <h3>Mäng käib</h3>
              <IonInput
                className="game-input"
                type="number"
                value={winnings}
                onIonChange={(e) => setWinnings(e.detail.value!)}
              />
              <h3>punktini</h3>
              <IonButton onClick={navigateToFourteenOne}>Alusta</IonButton>
            </div>
          }

          {eightBall === true &&
            <div>
              <h3>Mäng käib</h3>
              <IonInput
                className="game-input"
                type="number"
                value={winnings}
                onIonChange={(e) => setWinnings(e.detail.value!)}
              />
              <h3>võiduni</h3>
              <IonButton onClick={navigateToEight}>Alusta</IonButton>
            </div>
          }

          {nineBall === true &&
            <div>
              <h3>Mäng käib</h3>
              <IonInput
                className="game-input"
                type="number"
                value={winnings}
                onIonChange={(e) => setWinnings(e.detail.value!)}
              />
              <h3>võiduni</h3>
              <span>Võitja teeb avalöögi?</span>
              <IonCheckbox
                checked={checkboxChecked}
                onIonChange={handleCheckboxChange}
              />
              <br /><br />
              <IonButton onClick={navigateToNine}>Alusta</IonButton>
            </div>
          }

          {tenBall === true &&
            <div>
              <h3>Mäng käib</h3>
              <IonInput
                className="game-input"
                type="number"
                value={winnings}
                onIonChange={(e) => setWinnings(e.detail.value!)}
              />
              <h3>võiduni</h3>
              <span>Võitja teeb avalöögi?</span>
              <IonCheckbox
                checked={checkboxChecked}
                onIonChange={handleCheckboxChange}
              />
              <br /><br />
              <IonButton onClick={navigateToTen}>Alusta</IonButton>
            </div>
          }

          {snooker === true &&
            <div>
              <h3>Mäng käib</h3>
              <IonInput
                className="game-input"
                type="number"
                value={winnings}
                onIonChange={(e) => setWinnings(e.detail.value!)}
              />
              <h3>võiduni</h3>
              <IonCheckbox
                name="choice"
                value="15"
                onIonChange={handleRadioChange}
                checked={radioChoise === 15}
              />
              15
              <IonCheckbox
                name="choice"
                value="10"
                onIonChange={handleRadioChange}
                checked={radioChoise === 10}
              />
              10
              <IonCheckbox
                name="choice"
                value="6"
                onIonChange={handleRadioChange}
                checked={radioChoise === 6}
              />
              6
              <span> punasega</span>
              <br /><br />
              <IonButton onClick={navigateToSnooker}>Alusta</IonButton>
            </div>
          }
        </div>
      </IonContent>
    </IonPage>
  );
}

export default HomePage;