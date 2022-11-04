import { Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { AuthenticationClient } from '@team_eureka/eureka-ionic-core'
import OnBoardingPage from './pages/onboarding'
import SignInPage from './pages/sign-in'
import SectionExplore from './pages/sections/explore'
import SettingsClient from './clients/SettingsClient'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import './theme/ion-overrides.sass'

/* Ramen UI Base */
import '@ramenx/ui-library/dist/index.css'

/* React Hooks */
import { useEffect, useState } from 'react'

setupIonicReact()

interface PageState {
  booting?: boolean
  authenticated?: boolean
  is_first_time?: boolean
  app_booting?: boolean
}

const App: React.FC = () => {
  setupIonicReact({
    mode: 'ios'
  })

  /* Page state to controlate step by step the flow of the app */
  const [pageState, setPageState] = useState<PageState>({
    booting: true /* Booting flow when start the app */,
    authenticated:
      true /* Launch Authentication flow when user is not identified */,
    is_first_time: false /* Launch Onboarding flow when is first time */,
    app_booting: false /* Set if the start is booting */
  })

  useEffect(() => {
    const getStorageClientData = async () => {
      await SettingsClient.boot()
      await AuthenticationClient.boot()
      setPageState({
        is_first_time: SettingsClient.get('FIRST_TIME', true),
        authenticated: AuthenticationClient.isAuthenticated(),
      })
    }
    getStorageClientData()
  }, [])

  const onBoardingCompletedHandler = () => {
    setPageState({
      ...pageState,
      is_first_time: SettingsClient.get('FIRST_TIME', false)
    })
  }

  const { authenticated, is_first_time, app_booting } = pageState

  if (app_booting) {
    return <div></div>
  }
  if (is_first_time) {
    return (
      <OnBoardingPage
        onBoardingCompleted={() => onBoardingCompletedHandler()}
      ></OnBoardingPage>
    )
  }
  if (!authenticated) {
    return <SignInPage></SignInPage>
  }
  return (
    <IonApp>
      <IonReactRouter keyLength={1}>
        <IonRouterOutlet>
          {/* CORE PATHS */}
          <Route path='/' component={SectionExplore} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
