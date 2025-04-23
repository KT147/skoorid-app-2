import { IonCard, IonCheckbox, IonContent, IonPage } from "@ionic/react";
import { IonButton, IonInput, IonSelect, IonSelectOption } from "@ionic/react";
import { usePlayers } from "../store/PlayerContext";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const HomePage: React.FC = () => {
  const {
    setGameName,
    players,
    starter,
    setStarter,
    opponent,
    setOpponent,
    winnings,
    setWinnings,
  } = usePlayers();

  const [fourteenOne, setFourteenOne] = useState(false);
  const [eightBall, setEightBall] = useState(false);
  const [nineBall, setNineBall] = useState(false);
  const [tenBall, setTenBall] = useState(false);
  const [snooker, setSnooker] = useState(false);

  const history = useHistory();

  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioChoise, setRadioChoice] = useState(15);

  const [activeButton, setActiveButton] = useState<string>("");

  useEffect(() => {
    const savedCheckboxValue = localStorage.getItem("checkboxChecked");
    if (savedCheckboxValue !== null) {
      setCheckboxChecked(savedCheckboxValue === "true");
    } else {
      setCheckboxChecked(false);
    }

    const savedRadioChoice = localStorage.getItem("radioChoise");
    if (savedRadioChoice !== null) {
      setRadioChoice(Number(savedRadioChoice))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("radioChoise", radioChoise.toString())
  }, [radioChoise]);

  const playFourteenOne = () => {
    setGameName("14-1");
    setFourteenOne(true);
    setEightBall(false);
    setNineBall(false);
    setTenBall(false);
    setSnooker(false);
    setActiveButton("14-1");
  };

  const navigateToEight = () => {
    localStorage.setItem("starter", starter);
    localStorage.setItem("opponent", opponent);
    localStorage.setItem("winnings", winnings);
    history.push("/eight-ball");
  };

  const playEightBall = () => {
    setGameName("8-pall");
    setFourteenOne(false);
    setEightBall(true);
    setNineBall(false);
    setTenBall(false);
    setSnooker(false);
    setActiveButton("8-pall");
  };

  const navigateToNine = () => {
    localStorage.setItem("starter", starter);
    localStorage.setItem("opponent", opponent);
    localStorage.setItem("winnings", winnings);
    history.push("/nine-ball");
  };

  const playNineBall = () => {
    setGameName("9-pall");
    setFourteenOne(false);
    setEightBall(false);
    setNineBall(true);
    setTenBall(false);
    setSnooker(false);
    setActiveButton("9-pall");
  };

  const navigateToTen = () => {
    localStorage.setItem("starter", starter);
    localStorage.setItem("opponent", opponent);
    localStorage.setItem("winnings", winnings);
    history.push("/ten-ball");
  };

  const playTenBall = () => {
    setGameName("10-pall");
    setFourteenOne(false);
    setEightBall(false);
    setNineBall(false);
    setTenBall(true);
    setSnooker(false);
    setActiveButton("10-pall");
  };

  const navigateToSnooker = () => {
    localStorage.setItem("starter", starter);
    localStorage.setItem("opponent", opponent);
    localStorage.setItem("winnings", winnings);
    history.push("/snooker");
  };

  const playSnooker = () => {
    setGameName("Snuuker");
    setFourteenOne(false);
    setEightBall(false);
    setNineBall(false);
    setTenBall(false);
    setSnooker(true);
    setActiveButton("Snuuker");
  };

  const navigateToFourteenOne = () => {
    localStorage.setItem("starter", starter);
    localStorage.setItem("opponent", opponent);
    localStorage.setItem("winnings", winnings);
    history.push("/fourteen-one");
  };

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
      <br />
      <br />
      <br />

      <IonContent fullscreen scroll-y="true" keyboard-avoidance="true">
        <div>
          <IonCard className="home-card">
            <h5 className="home-page-titles">Vali alustav mängija</h5>
          </IonCard>

          <IonSelect
            className="ion-select-first"
            value={starter}
            onIonChange={(e) => setStarter(e.detail.value)}
          >
            <IonSelectOption value="" disabled>
              -- Vali mängija --
            </IonSelectOption>
            {players.map((player, i) => (
              <IonSelectOption key={i} value={player}>
                {player}
              </IonSelectOption>
            ))}
          </IonSelect>

          <IonCard className="home-card">
            {" "}
            <h5 className="home-page-titles">Vali vastane</h5>
          </IonCard>
          <IonSelect
            className="ion-select-second"
            value={opponent}
            onIonChange={(e) => setOpponent(e.detail.value)}
          >
            <IonSelectOption value="" disabled>
              -- Vali mängija --
            </IonSelectOption>
            {players.map((player, i) => (
              <IonSelectOption key={i} value={player}>
                {player}
              </IonSelectOption>
            ))}
          </IonSelect>

          <br />
          <br />
          <IonCard className="home-card">
            <h5 className="home-page-titles">Vali mäng</h5>
          </IonCard>
          <IonButton
            className={`game-button ${
              activeButton === "14-1" ? "selected" : ""
            }`}
            onClick={playFourteenOne}
          >
            14.1
          </IonButton>
          <IonButton
            className={`game-button ${
              activeButton === "8-pall" ? "selected" : ""
            }`}
            onClick={playEightBall}
          >
            8-pall
          </IonButton>
          <IonButton
            className={`game-button ${
              activeButton === "9-pall" ? "selected" : ""
            }`}
            onClick={playNineBall}
          >
            9-pall
          </IonButton>
          <br />
          <IonButton
            className={`game-button ${
              activeButton === "10-pall" ? "selected" : ""
            }`}
            onClick={playTenBall}
          >
            10-pall
          </IonButton>
          <IonButton
            className={`game-button ${
              activeButton === "Snuuker" ? "selected" : ""
            }`}
            onClick={playSnooker}
          >
            Snuuker
          </IonButton>

          {fourteenOne === true && (
            <div>
              <h4 className="home-page-titles">Mäng käib</h4>
              <IonInput
                label="Sisesta nr"
                labelPlacement="floating"
                fill="outline"
                className="game-input"
                type="number"
                value={winnings}
                onIonChange={(e) => setWinnings(e.detail.value!)}
                autofocus
              />
              <h4 className="home-page-titles">punktini</h4>
              <IonButton onClick={navigateToFourteenOne}>Alusta</IonButton>
            </div>
          )}

          {eightBall === true && (
            <div>
              <h4 className="home-page-titles">Mäng käib</h4>
              <IonInput
                label="Sisesta nr"
                labelPlacement="floating"
                fill="outline"
                className="game-input"
                type="number"
                value={winnings}
                onIonChange={(e) => setWinnings(e.detail.value!)}
                autofocus
              />
              <h4 className="home-page-titles">võiduni</h4>
              <IonButton onClick={navigateToEight}>Alusta</IonButton>
            </div>
          )}

          {nineBall === true && (
            <div>
              <h4 className="home-page-titles">Mäng käib</h4>
              <IonInput
                label="Sisesta nr"
                labelPlacement="floating"
                fill="outline"
                className="game-input"
                type="number"
                value={winnings}
                onIonChange={(e) => setWinnings(e.detail.value!)}
                autofocus
              />
              <h4 className="home-page-titles">võiduni</h4>
              <span>Võitja teeb avalöögi?</span>
              <IonCheckbox
                checked={checkboxChecked}
                onIonChange={handleCheckboxChange}
              />
              <br />
              <br />
              <IonButton onClick={navigateToNine}>Alusta</IonButton>
            </div>
          )}

          {tenBall === true && (
            <div>
              <h4 className="home-page-titles">Mäng käib</h4>
              <IonInput
                label="Sisesta nr"
                labelPlacement="floating"
                fill="outline"
                className="game-input"
                type="number"
                value={winnings}
                onIonChange={(e) => setWinnings(e.detail.value!)}
                autofocus
              />
              <h4 className="home-page-titles">võiduni</h4>
              <span>Võitja teeb avalöögi?</span>
              <IonCheckbox
                checked={checkboxChecked}
                onIonChange={handleCheckboxChange}
              />
              <br />
              <br />
              <IonButton onClick={navigateToTen}>Alusta</IonButton>
            </div>
          )}

          {snooker === true && (
            <div>
              <h4 className="home-page-titles">Mäng käib</h4>
              <IonInput
                label="Sisesta nr"
                labelPlacement="floating"
                fill="outline"
                className="game-input"
                type="number"
                value={winnings}
                onIonChange={(e) => setWinnings(e.detail.value!)}
                autofocus
              />
              <h4 className="home-page-titles">võiduni</h4>
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
              6<span> punasega</span>
              <br />
              <br />
              <IonButton onClick={navigateToSnooker}>Alusta</IonButton>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
