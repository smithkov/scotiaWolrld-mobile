import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../authentication.service";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";
import { LoaderServiceService } from "./../../loader-service.service";
import { Application } from "../../models/application";
import { AlertServiceService } from "./../../alert-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalPage } from "../modal/modal.page";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-compose",
  templateUrl: "./compose.page.html",
  styleUrls: ["./compose.page.scss"]
})
export class ComposePage implements OnInit {
  userId: any;
  constructor(
    public authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService,
    public router: Router,
    private alertService: AlertServiceService
  ) {
    this.authenticationService.getCurrentUser().then((user: any) => {
      this.userId = user.id;
      this.authenticationService.getMessages(user).subscribe(msg => {});
    });
  }

  ngOnInit() {}
  compose(form: NgForm) {
    this.loaderService.showLoader("Sending ...");
    this.authenticationService
      .compose(form.value.message, form.value.subject, this.userId)
      .subscribe(data => {
        if (!data.error) {
          this.loaderService.hideLoader();
          this.router.navigate(["/pages/dashboard"]);
          //this.showForm(false, true, false, false, false);
        } else {
          this.alertService.presentToast("Something went wrong!");
        }
      });
  }
}
