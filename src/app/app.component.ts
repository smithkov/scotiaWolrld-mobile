import { Component } from "@angular/core";

import { Platform, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthenticationService } from "./authentication.service";
import { OneSignal } from "@ionic-native/onesignal/ngx";

import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private oneSignal: OneSignal,
    private authenticationService: AuthenticationService,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is("cordova")) {
        this.setupPush();
      }
      // this.authenticationService.authenticationState.subscribe(state => {
      //   if (state) {
      //     this.router.navigate(["pages/dashboard"]);
      //   } else {
      //     this.router.navigate(["main/landing"]);
      //   }
      // });
    });
  }

  setupPush() {
    // I recommend to put these into your environment.ts
    this.oneSignal.startInit(
      "0bf3e865-0144-4221-a007-94c89b37ac63",
      "898831412619"
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.None
    );

    // Notifcation was received in general
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;

      this.showAlert(
        "Notification opened",
        "You already read this before",
        additionalData.task
      );
    });

    this.oneSignal.endInit();
    this.oneSignal.getIds().then(id => {
      this.authenticationService.savePush(id);
    });
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    });
    alert.present();
  }
}
