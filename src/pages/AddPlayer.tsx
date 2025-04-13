import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addCircle } from "ionicons/icons";
import { usePlayers } from "../store/PlayerContext";
import { useRef } from "react";

const AddPlayer: React.FC = () => {
  const nameRef = useRef<HTMLIonInputElement>(null);

  const { addPlayer, players, removePlayer } = usePlayers();


  const add = () => {
    const player = String(nameRef.current?.value);
    if (!player || player.trim() === "") {
      alert("Tühja nimega ei saa!");
      return;
    }
    addPlayer(player);
    if (nameRef.current) {
      nameRef.current.value = "";
    }
  }

  const deletePlayer = (index: number) => {
    const playerToDelete = players[index]
    const updatedPlayers = [...players]
    updatedPlayers.splice(index, 1)
  
    localStorage.setItem('players', JSON.stringify(updatedPlayers))
  
    removePlayer(playerToDelete)
  };
  

  return (
    <IonPage>
      <br /><br /><br />
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
          <br />
          <br />
          <br />
          <br />
        </IonHeader>
        <IonCard className="home-card">
            <h3 className="home-page-titles">Lisa mängija</h3>
          </IonCard>
        <IonInput
          label="Sisesta nimi"
          labelPlacement="floating"
          fill="outline"
          ref={nameRef}
          className="center-input"
          autocapitalize="words"
        ></IonInput>
        <br />
        <br />
        <IonButton onClick={add} shape="round">
          <IonIcon icon={addCircle} style={{ marginRight: "20px" }}></IonIcon>
          Lisa
        </IonButton>
        <br /><br /><br />
        <IonCard className="home-card">
            <h3 className="home-page-titles">Mängijad:</h3>
          </IonCard>
        <IonList inset={true}>
          {players.map((player, index) => (
            <IonItem key={index}>
              <IonLabel>{player}</IonLabel>
              <IonButton onClick={() => deletePlayer(index)}>Eemalda</IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddPlayer;
