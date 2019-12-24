import { Injectable } from "@angular/core";
import { Platform, AlertController, LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class LoaderServiceService {
  loaderToShow: any;
  constructor(public loadingController: LoadingController) {}

  showLoader(message) {
    this.loaderToShow = this.loadingController
      .create({
        message: message
      })
      .then(res => {
        res.present();

        // res.onDidDismiss().then(dis => {
        //   console.log("Loading dismissed!");
        // });
      });
  }

  hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);
  }
}
