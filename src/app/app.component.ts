import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private platform: Platform,
    private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('ios')) {
        this.statusBar.styleDefault();
      } else {
        this.statusBar.styleLightContent();
      }
      this.splashScreen.hide();

      // subscribe to a topic
      // this.fcm.subscribeToTopic('Notificação');

      // get FCM token
      this.fcm.getToken().then((token) => {
        console.log(token);
      });

      // ionic push notification example
      this.fcm.onNotification().subscribe((data) => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      });

      // refresh the FCM token
      this.fcm.onTokenRefresh().subscribe((token) => {
        console.log(token);
      });

      // unsubscribe from a topic
      // this.fcm.unsubscribeFromTopic('offers');
    });
  }
}
