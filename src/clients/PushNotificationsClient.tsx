import { Expr, XConsole } from '@team_eureka/eureka-ionic-core';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import { FCM } from '@capacitor-community/fcm';
import SettingsClient from './SettingsClient';
import { Redirect } from 'react-router';

const Logger = XConsole({ label: 'pushnotification-client' });

class PushNotificationsClient {
  async checkPermissions(done: () => void) {
    Expr.whenInNativePhone(async () => {
      const permissionState = await PushNotifications.checkPermissions();
      switch (permissionState.receive) {
        case 'granted':
          Logger.info('requestPushNotificationPermissions: granted');
          await this.registerListener();
          done();
          break;
        case 'denied':
          Logger.info('PushNotificationsHandler: denied');
          // eslint-disable-next-line no-case-declarations
          const deniedResult = await PushNotifications.requestPermissions();
          if (deniedResult.receive === 'granted') {
            Logger.info('requestPushNotificationPermissions: granted');
            await this.registerListener();
          }
          done();
          break;
        case 'prompt':
          Logger.info('PushNotificationsHandler: prompt');
          // eslint-disable-next-line no-case-declarations
          const promptResult = await PushNotifications.requestPermissions();
          if (promptResult.receive === 'granted') {
            Logger.info('requestPushNotificationPermissions: granted');
            await this.registerListener();
            done();
          }
          // Call again to check the authorization
          setTimeout(this.checkPermissions, 500);
          break;
      }
    });
  }

  private registerListener() {
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();
    Logger.info('RegisterListenerPushNotification');
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', async (token: Token) => {
      Expr.whenAndroid(async () => {
        Logger.info('Push registration success, APNS Token: ', token.value);
        SettingsClient.set('PUSH_TOKEN', token.value);
      });
      Expr.whenIos(async () => {
        const FCMResponse = await FCM.getToken();
        Logger.info(
          'Push registration success, FCM Token: ',
          FCMResponse.token
        );
        SettingsClient.set('PUSH_TOKEN', FCMResponse.token);
      });
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      Logger.error('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        Logger.info([
          {
            id: notification.id,
            title: notification.title,
            body: notification.body,
            type: 'foreground',
          },
        ]);
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        Logger.info([
          {
            id: notification.notification.data.id,
            title: notification.notification.data.title,
            body: notification.notification.data.body,
            type: 'action',
          },
        ]);
        return <Redirect to='/' />;
      }
    );
  }
}

export default new PushNotificationsClient();
