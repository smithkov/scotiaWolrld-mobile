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
  selector: "app-second-form",
  templateUrl: "./second-form.page.html",
  styleUrls: ["./second-form.page.scss"]
})
export class SecondFormPage implements OnInit {
  postalAddress: any;
  homeAddress: any;
  phone: any;
  id: any;
  userId: any;
  data: any;
  constructor(
    private authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService,
    private modalCtrl: ModalController,
    public router: Router,
    private alertService: AlertServiceService
  ) {}

  ngOnInit() {
    this.loaderService.showLoader("Loading ...");
    this.authenticationService.getCurrentUser().then(e => {
      this.userId = e.id;
      this.authenticationService.formOne(e.id).subscribe(data => {
        this.loaderService.hideLoader();
        if (data.app) {
          this.postalAddress = data.app.postalAddress;
          this.homeAddress = data.app.homeAddress;
          this.phone = data.app.phone;
          this.id = data.app.id;
        }
      });
    });
    this.authenticationService.getData().then((data: any) => {
      this.data = data;
    });
  }
  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage
    });
    modal.onDidDismiss().then(dataReturned => {
      if (dataReturned.data !== undefined) {
        console.log(dataReturned);
        this.data = dataReturned.data;
      }
    });
    await modal.present();
  }
  save(form: NgForm) {
    let f = new Application();
    f.homeAddress = form.value.homeAddress;
    f.postalAddress = form.value.postalAddress;
    f.phone = form.value.postalAddress;
    f.applicationId = form.value.id;
    f.userId = this.userId;
    this.authenticationService.form2(f).subscribe(data => {
      if (!data.isError) {
        this.loaderService.hideLoader();
        this.router.navigate(["/pages/thirdForm"]);
      } else {
        this.alertService.presentToast("Something went wrong!");
      }
    });
  }
}
