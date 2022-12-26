import './index.sass';
import React, { Fragment, useEffect, useState } from 'react';
import {
  IonModal,
  IonContent,
  IonFooter,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonIcon,
  useIonAlert,
} from '@ionic/react';
import { App } from '@capacitor/app';
import {
  AuthenticationClient,
  i18,
  IJwtEntity,
  Expr,
  XConsole,
} from '@team_eureka/eureka-ionic-core';
import locales from './locales';
import { arrowBackOutline } from 'ionicons/icons';
import DummyAvatarImage from './../../assets/media/dummy-avatar.svg';
import PoweredBy from './../../assets/media/built-with-love.svg';
import { XButton } from '@ramenx/ui-library';

const packageJSON = require('../../../package.json');
const cencosudx = XConsole({ label: 'use-menu' });
const localize = i18(locales);

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  userInfo: IJwtEntity;
}

const UserMenu: React.FC<IProps> = ({ isOpen, onClose, userInfo }) => {
  const [version, setVersion] = useState<string | undefined>('');
  const [user, setUser] = useState<IJwtEntity | undefined>();
  const [present] = useIonAlert();

  useEffect(() => {
    getAppInfo();
    setUser(AuthenticationClient.getInfo());
  }, []);

  const onSignOutClickHandler = async () => {
    present({
      cssClass: 'secondary',
      header: 'Cerrar sesión',
      message: localize('ALERT_SIGN_OUT_LABEL', ''),
      buttons: [
        localize('ALERT_CANCEL_LABEL', ''),
        {
          text: localize('ALERT_CONFIRM_LABEL', ''),
          handler: async (d) => {
            try {
              await AuthenticationClient.signOut();
            } catch (e) {
              cencosudx.error('An error has ocurred trying to sign out', e);
            }
            window.location.reload();
          },
        },
      ],
      onDidDismiss: (e) => console.log('did dismiss'),
    });
  };

  const getAppInfo = async () => {
    Expr.whenInNativePhone(async () => {
      const appInfo = await App.getInfo();
      setVersion(
        `${packageJSON.version} - base ${appInfo.version}-${appInfo.build}`
      );
    });
  };

  return (
    <Fragment>
      <IonModal
        swipeToClose={false}
        backdropDismiss={false}
        className='user-full-menu'
        isOpen={isOpen}
      >
        <IonHeader className='ion-no-border box-and-icon'>
          <IonToolbar>
            <IonButtons slot='start'>
              {!onClose ? null : (
                <IonButton
                  className='white'
                  onClick={() => {
                    onClose();
                  }}
                >
                  <IonIcon icon={arrowBackOutline} size='large' />
                </IonButton>
              )}
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className='user-info'>
          <div>
            <img src={DummyAvatarImage} />
          </div>
          <div className='name'>{userInfo!.unique_name}</div>
          <div className='email'>{userInfo!.email}</div>
        </IonContent>
        <IonFooter>
          <XButton
            background='black'
            size='large'
            onClick={onSignOutClickHandler}
          >
            {localize('SIGN_OUT', '')}
          </XButton>
          <div>
            <img src={PoweredBy} width='65%' />
          </div>
          <div className='version'>{version}</div>
        </IonFooter>
      </IonModal>
    </Fragment>
  );
};

export default UserMenu;
