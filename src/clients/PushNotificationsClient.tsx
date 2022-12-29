import { Expr, XConsole } from '@team_eureka/eureka-ionic-core';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';
import SettingsClient from './SettingsClient';
import { Redirect } from 'react-router';
import { rootRoute } from '../routes';

const Logger = XConsole({ label: 'pushnotification-client' });

class PushNotificationsClient {
  async checkPermissions(done: () => void) {
    Expr.whenInNativePhone(async () => {
      const permissionState = await PushNotifications.checkPermissions();
      const requestState = await PushNotifications.requestPermissions();
      switch (permissionState.receive) {
        case 'granted':
          Logger.info('requestPushNotificationPermissions: granted');
          await this.registerListener();
          done();
          break;
        case 'denied':
          Logger.info('PushNotificationsHandler: denied');
          if (requestState.receive === 'granted') {
            Logger.info('requestPushNotificationPermissions: granted');
            await this.registerListener();
          }
          done();
          break;
        case 'prompt':
          Logger.info('PushNotificationsHandler: prompt');
          if (requestState.receive === 'granted') {
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
      Logger.info('Push registration success, token: ', JSON.stringify(token));
      SettingsClient.set('PUSH_TOKEN', token.value);
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
        return <Redirect to={rootRoute} />;
      }
    );
  }
}

export default new PushNotificationsClient();
