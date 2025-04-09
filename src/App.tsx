import { Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { add, home, list } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import AddPlayer from "./pages/AddPlayer";
import HomePage from "./pages/HomePage";
import Scores from "./pages/Scores";

import "./App.css";
import EightBall from "./pages/EightBall";
import NineBall from "./pages/NineBall";
import TenBall from "./pages/TenBall";
import FourteenOne from "./pages/FourteenOne";
import Snooker from "./pages/Snooker";

setupIonicReact();

const App: React.FC = () => (
  <IonApp className="blurred">
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/add-player">
            <AddPlayer />
          </Route>
          <Route exact path="/home-page">
            <HomePage />
          </Route>
          <Route exact path="/scores">
            <Scores />
          </Route>
          <Route exact path="/fourteen-one">
            <FourteenOne />
          </Route>
          <Route exact path="/eight-ball">
            <EightBall />
          </Route>
          <Route exact path="/nine-ball">
            <NineBall />
          </Route>
          <Route exact path="/ten-ball">
            <TenBall />
          </Route>
          <Route exact path="/snooker">
            <Snooker />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/add-player">
            <IonIcon aria-hidden="true" icon={add} />
            <IonLabel>Lisa mängija</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/home-page">
            <IonIcon aria-hidden="true" icon={home} />
            <IonLabel>Avaleht</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/scores">
            <IonIcon aria-hidden="true" icon={list} />
            <IonLabel>Skoorid</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;