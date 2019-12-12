import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import {
  ModalController,
  NavController,
  LoadingController
} from "@ionic/angular";
import { AuthenticationService } from "./../../authentication.service";
import { AlertServiceService } from "./../../alert-service.service";
import { LoaderServiceService } from "./../../loader-service.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loading: any;
  pushId: any;
  constructor(
    private navCtrl: NavController,
    private loaderService: LoaderServiceService,
    public authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    private alertService: AlertServiceService
  ) {
    this.authenticationService.getPush().then(pushId => {
      this.pushId = pushId;
    });
  }

  ngOnInit() {}

  login(form: NgForm) {
    this.loaderService.showLoader("Signing in ...");
    this.authenticationService
      .login(form.value.username, form.value.password, this.pushId)
      .subscribe(
        data => {
          this.loaderService.hideLoader();
          if (data.success) {
            this.navCtrl.navigateRoot("/pages/dashboard");
          } else {
            this.alertService.presentToast("Invalid login!");
          }
        },
        error => {
          this.loaderService.hideLoader();
          this.alertService.presentToast("Server not available");
        }
      );
  }
}
