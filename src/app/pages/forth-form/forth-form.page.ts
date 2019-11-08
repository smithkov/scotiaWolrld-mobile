import { Component, OnInit } from "@angular/core";
import { Application } from "../../models/application";
import { AuthenticationService } from "./../../authentication.service";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertServiceService } from "./../../alert-service.service";
import { LoaderServiceService } from "./../../loader-service.service";
import { ModalPage } from "../modal/modal.page";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-forth-form",
  templateUrl: "./forth-form.page.html",
  styleUrls: ["./forth-form.page.scss"]
})
export class ForthFormPage implements OnInit {
  hasAppliedSel: any;
  hasApplied: any;
  purpose: any;
  id: any;
  data: any;
  userId: any;
  reasonOfRefusal: any;
  moreInfo: any;
  constructor(
    public authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService,
    public router: Router,
    private modalCtrl: ModalController,
    private alertService: AlertServiceService
  ) {
    this.loaderService.showLoader("Loading ...");
    this.authenticationService.getCurrentUser().then(e => {
      this.userId = e.id;
      this.authenticationService.formOne(e.id).subscribe(data => {
        this.loaderService.hideLoader();

        if (data.app) {
          this.hasAppliedSel = data.app.hasApplied;
          this.purpose = data.app.purpose;
          this.reasonOfRefusal = data.app.reasonOfRefusal;
          this.moreInfo = data.app.moreInfo;
          this.id = data.app.id;
        }
      });
    });
    this.authenticationService.getData().then((data: any) => {
      this.data = data;
    });
  }

  ngOnInit() {}
  getHasApplied(event) {
    this.hasApplied = event.target.text;
  }
  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage
    });
    modal.onDidDismiss().then(dataReturned => {
      if (dataReturned.data !== undefined) {
        this.data = dataReturned.data;
      }
    });
    await modal.present();
  }
  save(form: NgForm) {
    this.loaderService.showLoader("Saving ...");
    let f = new Application();
    f.moreInfo = form.value.moreInfo;
    f.purpose = form.value.purpose;
    f.hasApplied = form.value.hasApplied;
    f.reasonOfRefusal = form.value.reasonOfRefusal;
    f.userId = this.userId;
    f.applicationId = this.id;

    this.authenticationService.form5(f).subscribe(data => {
      if (!data.isError) {
        this.loaderService.hideLoader();
        this.router.navigate(["pages/uploadForm"]);
      } else {
        this.alertService.presentToast("Something went wrong!");
      }
    });
  }
}
