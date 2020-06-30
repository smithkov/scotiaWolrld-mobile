import { Component, OnInit } from "@angular/core";
import { Application } from "../../models/application";
import { AuthenticationService } from "./../../authentication.service";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { AlertServiceService } from "./../../alert-service.service";
import { LoaderServiceService } from "./../../loader-service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-final",
  templateUrl: "./final.page.html",
  styleUrls: ["./final.page.scss"],
})
export class FinalPage implements OnInit {
  app: any;
  postalAddress: any;
  homeAddress: any;
  phone: any;
  id: any;
  data: any;
  userId: any;
  path: any;
  constructor(
    private authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService,
    public router: Router,
    private alertService: AlertServiceService
  ) {}

  ngOnInit() {
    this.authenticationService.getCurrentUser().then((e) => {
      this.userId = e.id;
      this.authenticationService.formOne(e.id).subscribe((data) => {
        this.loaderService.hideLoader();
        if (data.app) {
          this.id = data.app.id;
        }
      });
    });
    this.authenticationService.getData().then((data: any) => {
      this.data = data;
    });
  }

  final() {
    this.loaderService.showLoader("Saving ...");
    let f = new Application();
    f.userId = this.userId;
    f.applicationId = this.id;

    this.authenticationService.final(f).subscribe((data) => {
      if (!data.isError) {
        this.loaderService.hideLoader();
        this.router.navigate(["pages/dashboard_update"]);
      } else {
        this.alertService.presentToast("Something went wrong!");
      }
    }),
      (err) => {
        this.loaderService.hideLoader();
        this.alertService.presentToast("Server not available");
      };
  }
}
