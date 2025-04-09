import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { addCircle } from 'ionicons/icons'
import { usePlayers } from '../store/PlayerContext';
import { useRef } from 'react';
import { useHistory} from 'react-router-dom';


const AddPlayer: React.FC = () => {

    const nameRef = useRef<HTMLIonInputElement>(null)

    const { addPlayer } = usePlayers()

    const history = useHistory()

    const add = () => {
        const player = String(nameRef.current?.value)
        if (!player || player.trim() === "") {
          alert("Tühja nimega ei saa!")
          return
        }
        addPlayer(player)
        history.push("/home-page")
    }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <br />
          <br />
        <IonTitle size="large">Lisa mängija</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large"></IonTitle>
          </IonToolbar>
        <br /><br /><br /><br />
        </IonHeader>
        <IonInput label="Sisesta nimi" labelPlacement="floating" fill="outline" ref={nameRef} className="center-input" ></IonInput>
        <br /><br />
        <IonButton onClick={add} shape="round">
          <IonIcon icon={addCircle} style={{marginRight:"20px"}}></IonIcon>
          Lisa
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AddPlayer;