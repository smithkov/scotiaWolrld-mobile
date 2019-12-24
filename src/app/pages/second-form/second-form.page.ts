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
  contactEmail: any;
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
    this.authenticationService.getCurrentUser().then(e => {
      this.userId = e.id;
      this.contactEmail = e.email;
      this.authenticationService.getApplication().then(app => {
        if (app) {
          this.postalAddress = app.postalAddress;
          this.homeAddress = app.homeAddress;
          this.phone = app.phone;
          this.id = app.id;
        }
      });
    });
    //this gets the current course
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
        this.data = dataReturned.data;
      }
    });
    await modal.present();
  }
  save(form: NgForm) {
    this.loaderService.showLoader("Saving ...");
    let f = new Application();
    f.homeAddress = form.value.homeAddress;
    f.postalAddress = form.value.postalAddress;
    f.phone = form.value.phone;
    f.contactEmail = form.value.contactEmail;
    f.applicationId = form.value.id;
    f.userId = this.userId;
    this.authenticationService.form2(f).subscribe(
      data => {
        this.loaderService.hideLoader();
        if (!data.isError) {
          this.router.navigate(["/pages/thirdForm"]);
        } else {
          this.alertService.presentToast("Something went wrong!");
        }
      },
      error => {
        this.loaderService.hideLoader();
        this.alertService.presentToast("Server not available");
      }
    );
  }
}
