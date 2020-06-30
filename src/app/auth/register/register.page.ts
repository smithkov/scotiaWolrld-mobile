import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { AuthenticationService } from "./../../authentication.service";
import { AlertServiceService } from "./../../alert-service.service";
import { LoaderServiceService } from "./../../loader-service.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  loading: any;
  pushId: any;
  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    private alertService: AlertServiceService,
    private loaderService: LoaderServiceService
  ) {}

  ngOnInit() {}

  register(form: NgForm) {
    this.loaderService.showLoader("Registering ...");
    this.authenticationService
      .register(form.value.username, form.value.email, form.value.phone, form.value.password)
      .subscribe(
        data => {
          this.loaderService.hideLoader();
          if (data.success) this.router.navigate(["/pages/dashboard"]);
          else {
            this.alertService.presentToast(data.message);
          }
        },
        error => {
          this.loaderService.hideLoader();
        }
      ), (err) => {this.loaderService.hideLoader()};
  }
}
