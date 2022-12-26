import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { IonContent, IonFooter, IonIcon, IonPage } from '@ionic/react';
import {
  InAppBrowser,
  InAppBrowserEvent,
} from '@awesome-cordova-plugins/in-app-browser';
import { arrowBack } from 'ionicons/icons';
import LoginHeader from '../../assets/media/graphic-profile.svg';
import {
  AuthenticationClient,
  Expr,
  IJwt,
  i18,
  XConsole,
} from '@team_eureka/eureka-ionic-core';

import SettingsClient from '../../clients/SettingsClient';
import PushNotificationsClient from '../../clients/PushNotificationsClient';
import { IUser } from '../../models/users/IUser';
import { ICustomer } from '../../models/users/ICustomer';
import locales from './locales';
import './index.sass';

import { XButton, XGrid, XImage, XSpace, XText } from '@ramenx/ui-library';
import UserClient from '../../clients/UserClient';
import { AxiosResponse } from 'axios';

const localize = i18(locales);
const colorGray = 'rgba(0,0,0,0.6)';
const cencosudx = XConsole({ label: 'signin-page' });

export type onSignInCallbackHandler = (miLocalUser: IUser) => void;

interface IProps {
  onAuthenticated: (
    needRegistration: boolean,
    jwt?: IJwt,
    callback?: onSignInCallbackHandler,
    customer?: ICustomer
  ) => void;
}

const SignInPage: React.FC<IProps> = (props) => {
  const [swiper, setSwiper] = useState<any>();
  const [slideState, setSlideStates] = useState<number>(0);

  const onGoBackHandler = () => {
    swiper!.slidePrev();
  };

  const onGetSwiperHandler = (e: any) => {
    setSwiper(e);
  };

  const onSSOCallbackHandler = async (jwt: IJwt) => {
    const authenticateUser = async (provider: string, jwt: IJwt) => {
      await AuthenticationClient.authenticate(provider, {
        access_token: jwt.access_token,
        expires_in: jwt.expires_in,
        token_type: jwt.token_type,
      });
      props.onAuthenticated(false);
    };
    try {
      //const myInfo = await UserClient.meWithJwt(jwt);
      //const link = myInfo.links?.find((item, key) => item.rel === 'update_device_token');
      let deviceToken = '';
      const updateToken = async (deviceToken: string) => {
        try {
          await UserClient.updateNotificationTokenWithJwt(deviceToken, jwt);
        } catch (error) {
          cencosudx.error(
            'An error has ocurred trying to update the device token'
          );
          cencosudx.debug('xhr error', error);
        }
      };
      Expr.whenInNativePhone(async () => {
        const deviceToken = SettingsClient.get('PUSH_TOKEN');
        if (!deviceToken) {
          PushNotificationsClient.checkPermissions(async () => {
            await updateToken(SettingsClient.get('PUSH_TOKEN'));
          });
        }
        await updateToken(deviceToken);
      });
      Expr.whenNotInNativePhone(async () => {
        deviceToken = 'fake_token_when_browser';
        await updateToken(deviceToken);
      });

      authenticateUser('google', jwt);
    } catch (ex: any) {
      const customer = ex.data as ICustomer;

      if (!ex.response) {
        return;
      }

      switch ((ex.response as AxiosResponse).status) {
        case 404:
          props.onAuthenticated(true, jwt, () => {
            authenticateUser('cencosud', jwt);
          });
          break;
        case 206:
          props.onAuthenticated(
            true,
            jwt,
            () => {
              authenticateUser('cencosud', jwt);
            },
            customer
          );
          break;
        default:
          cencosudx.error('unhandled response meWithJwt');
      }
      cencosudx.debug(ex);
    }
  };

  const onCencosudLogin = async () => {
    const loginUrl = `${process.env.REACT_APP_SSO_API_ENDPOINT}/saml/101010101010101010101/login`;

    Expr.whenInNativePhone(async () => {
      const inAppBrowserRef = InAppBrowser.create(loginUrl, '_blank', {
        location: 'no',
      });
      inAppBrowserRef.show();

      inAppBrowserRef
        .on('loadstop')
        .subscribe(async (evt: InAppBrowserEvent) => {
          if (evt.url && evt.url.includes('access_token')) {
            //url interceptor
            const queryString = evt.url.split('#')[1];
            const urlParams = new URLSearchParams(queryString);

            const authData: IJwt = {
              access_token: urlParams.get('access_token') || '',
              token_type: urlParams.get('token_type') || '',
              expires_in: parseInt(urlParams.get('expires_in') || '0'),
            };

            console.log('data', authData); //this.authenticateBySamlToken(authData, () => { }, () => { })
            onSSOCallbackHandler(authData);
            inAppBrowserRef.close();
          }
        });
    });
    Expr.whenNotInNativePhone(() => {
      const onPopupMessage = async (e: any) => {
        if (e.origin === e.data.origin) {
          const authData = e.data;

          console.log('data', authData); //this.authenticateBySamlToken(authData, () => { }, () => { });
          onSSOCallbackHandler(authData);
        }
      };

      window.addEventListener('message', onPopupMessage);
      const loginPopUp = window.open(
        loginUrl,
        '_blank',
        'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=500,width=500,height=600'
      );

      // Only in web
      const timer = setInterval(function () {
        if (loginPopUp && loginPopUp.closed) {
          console.log('Closed ....');
          clearInterval(timer);
          window.removeEventListener('message', onPopupMessage);
        }
      }, 500);
    });
  };

  return (
    <IonPage className='signin-page'>
      <IonContent>
        <Swiper
          onInit={onGetSwiperHandler}
          initialSlide={0}
          speed={400}
          onSlideChange={(e) => setSlideStates(e.activeIndex)}
        >
          <SwiperSlide className='login-entry'>
            <XSpace level='2' />
            <XImage src={LoginHeader} />
            <XSpace level='4' />
            <XText level='4' leading='title' background='black'>
              {localize('LOGIN_TITLE', '')}
            </XText>
            <XText level='9' leading='title' background={colorGray}>
              {localize('LOGIN_SUBTITLE', '')}
            </XText>
          </SwiperSlide>
          <SwiperSlide className='login-data'>
            <XSpace level='3' />
            <div onClick={() => onGoBackHandler()}>
              <IonIcon icon={arrowBack}></IonIcon>
            </div>
            <XSpace level='8' />
            <XGrid></XGrid>
          </SwiperSlide>
        </Swiper>
      </IonContent>
      <IonFooter>
        <XButton
          background='black'
          size='xlarge'
          onClick={() => onCencosudLogin()}
        >
          {localize('LOGIN_CENCOSUD', '')}
        </XButton>
        <XSpace level='4' />
      </IonFooter>
    </IonPage>
  );
};

export default SignInPage;
