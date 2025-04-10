import { Redirect, Route } from "react-router-dom";
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

import PasswordPrompt from "./store/PasswordPromt"; // Importige PasswordPrompt komponent
import ProtectedRoute from "./store/ProtectedRoute";

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
import { useEffect, useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    if (savedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handlePasswordSubmit = () => {
    setIsLoggedIn(true)
  };

  return (
    <IonApp className="blurred">
      <div className="top-status-bar"></div>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/" exact>
              {isLoggedIn ? (
                <Redirect to="/home" />
              ) : (
                <PasswordPrompt onPasswordSubmit={handlePasswordSubmit} />
              )}
            </Route>
            <ProtectedRoute
              path="/add-player"
              component={AddPlayer}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
              path="/home"
              component={HomePage}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
              path="/scores"
              component={Scores}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
              path="/fourteen-one"
              component={FourteenOne}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
              path="/eight-ball"
              component={EightBall}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
              path="/nine-ball"
              component={NineBall}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
              path="/ten-ball"
              component={TenBall}
              isLoggedIn={isLoggedIn}
            />
            <ProtectedRoute
              path="/snooker"
              component={Snooker}
              isLoggedIn={isLoggedIn}
            />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/add-player">
              <IonIcon aria-hidden="true" icon={add} />
              <IonLabel>Lisa mängija</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/home">
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
};

export default App;
