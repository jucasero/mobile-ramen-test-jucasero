import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import SettingsClient from './clients/SettingsClient';

/* Core Pages */
import SignInPage, { onSignInCallbackHandler } from './pages/sign-in';
import OnBoardingPage from './pages/onboarding';
import RootHomePage from './pages/root-home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/ion-overrides.sass';

/* Ramen UI Base */
import '@ramenx/ui-library/dist/index.css';

/* React Hooks */
import { useEffect, useState } from 'react';
import { AuthenticationClient, IJwt } from '@team_eureka/eureka-ionic-core';
import { ICustomer } from './models/users/ICustomer';

/* Parte de la documentacion para equipos regionales (agregar modulo) */
//import ProductScanTool from "./pages/tools/tool-product-scan";
// Merchandise reception imports
import {
  MerchandiseReceptionCategories,
  MerchandiseReceptionSubCategories,
} from './pages/tasks/merchandise-reception-task/views';
import { routes } from './constants';

import animationBuilder from './libs/AnimationBuilder';

/* Set the lenguage (spanish if the default lenguage if you dont set any other) */
/* setLocale('br') */

setupIonicReact();

const App: React.FC = () => {
  setupIonicReact({
    mode: 'ios',
  });

  /* Page state to controlate step by step the flow of the app */
  const [authenticated, setAuth] = useState<boolean>(false);
  const [is_first_time, setFirstTime] = useState<boolean>(false);
  const [app_booting, setAppBooting] = useState<boolean>(false);
  const [registration_data, setRegistration] = useState<any>();

  useEffect(() => {
    const getStorageClientData = async () => {
      try {
        await SettingsClient.boot();
        await AuthenticationClient.boot();
        setFirstTime(SettingsClient.get('FIRST_TIME', true));
        setAuth(AuthenticationClient.isAuthenticated());
        console.log('auth', authenticated);
      } catch (error) {
        console.log(error);
      }
    };
    getStorageClientData();
  }, []);

  const onBoardingCompletedHandler = () => {
    setFirstTime(SettingsClient.get('FIRST_TIME', false));
  };

  const onAuthenticatedHandler = async (
    needRegistration: boolean,
    jwt?: IJwt,
    callback?: onSignInCallbackHandler,
    customer?: ICustomer
  ) => {
    setAuth(true);
    setRegistration({ jwt: jwt, customer: customer });
  };

  if (app_booting) {
    return <div></div>;
  }
  if (is_first_time) {
    return (
      <OnBoardingPage
        onBoardingCompleted={() => onBoardingCompletedHandler()}
      ></OnBoardingPage>
    );
  }
  if (!authenticated) {
    return <SignInPage onAuthenticated={onAuthenticatedHandler} />;
  }
  return (
    <IonApp>
      <IonReactRouter keyLength={1}>
        <IonRouterOutlet animation={animationBuilder}>
          {/* CORE PATHS */}
          <Route path='/' component={RootHomePage} exact={true} />

          {/* Parte de la documentacion de los equipos regionales (rutas de modulos) */}
          {/* Merchandise reception routes */}
          <Route
            path={routes.merchandiseReception}
            component={MerchandiseReceptionCategories}
            exact={true}
          />
          <Route
            path={routes.productCategory}
            component={MerchandiseReceptionSubCategories}
            exact={true}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
