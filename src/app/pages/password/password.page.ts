import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../authentication.service";
import { Observable } from "rxjs";
import { NgForm, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertServiceService } from "./../../alert-service.service";
import { LoaderServiceService } from "./../../loader-service.service";
import { ModalPage } from "../modal/modal.page";

@Component({
  selector: "app-password",
  templateUrl: "./password.page.html",
  styleUrls: ["./password.page.scss"]
})
export class PasswordPage implements OnInit {
  oldPassword: any;
  newPassword: any;
  confirmNewPassword: any;
  username: any;
  constructor(
    public authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService,
    public router: Router,
    private alertService: AlertServiceService
  ) {}

  ngOnInit() {
    this.authenticationService.getCurrentUser().then(user => {
      this.username = user.username;
    });
  }

  save(form: NgForm) {
    let oldPass = form.value.oldPassword;
    let newPass = form.value.newPassword;
    let confirm = form.value.confirmNewPassword;

    if (confirm === newPass) {
      this.loaderService.showLoader("Saving ...");
      this.authenticationService
        .changePassword(oldPass, newPass, this.username)
        .subscribe(result => {
          this.loaderService.hideLoader();
          this.alertService.presentToast("Password was changed successfully.");
        });
    } else {
      this.alertService.presentToast("New password does not match.");
    }
  }
}
