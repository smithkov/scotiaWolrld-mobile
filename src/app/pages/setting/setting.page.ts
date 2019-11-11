import { Component, OnInit } from "@angular/core";
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
  selector: "app-setting",
  templateUrl: "./setting.page.html",
  styleUrls: ["./setting.page.scss"]
})
export class SettingPage implements OnInit {
  username: any;
  email: any;
  constructor(
    private authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService,
    public router: Router,
    private alertService: AlertServiceService
  ) {}

  ngOnInit() {
    this.authenticationService.getCurrentUser().then(user => {
      console.log(user);
      this.username = user.username;
      this.email = user.email;
    });
  }
}
