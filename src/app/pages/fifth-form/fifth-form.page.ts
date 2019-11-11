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
  selector: "app-fifth-form",
  templateUrl: "./fifth-form.page.html",
  styleUrls: ["./fifth-form.page.scss"]
})
export class FifthFormPage implements OnInit {
  sponsorSel: any;
  sponsor: any;
  sponsorName: any;
  sponsorOccupation: any;
  id: any;
  data: any;
  userId: any;
  budget: any;
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
          this.sponsorSel = data.app.sponsor;
          this.sponsorName = data.app.sponsorName;
          this.sponsorOccupation = data.app.sponsorOccupation;
          this.budget = data.app.budget;
          this.id = data.app.id;
        }
      });
    });
    this.authenticationService.getData().then((data: any) => {
      this.data = data;
      console.log(data);
    });
  }

  ngOnInit() {}
  getSponsor(event) {
    this.sponsor = event.target.text;
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
    f.sponsor = form.value.sponsor;
    f.sponsorName = form.value.sponsorName;
    f.budget = form.value.budget;
    f.sponsorOccupation = form.value.sponsorOccupation;
    f.userId = this.userId;
    f.applicationId = this.id;
    f.course1 = this.data.name;
    f.course2 = this.data.name;
    f.schoolWish1 = this.data.Institution.name;
    f.schoolWish2 = this.data.Institution.name;
    f.cityId = this.data.Institution.CityId;

    this.authenticationService.form4(f).subscribe(data => {
      if (!data.isError) {
        this.loaderService.hideLoader();
        //this.router.navigate(["pages/uploadForm"]);
        this.router.navigate(["pages/forthForm"]);
      } else {
        this.alertService.presentToast("Something went wrong!");
      }
    });
  }
}
