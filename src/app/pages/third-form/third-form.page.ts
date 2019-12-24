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
  selector: "app-third-form",
  templateUrl: "./third-form.page.html",
  styleUrls: ["./third-form.page.scss"]
})
export class ThirdFormPage implements OnInit {
  quali: Observable<any>;

  hQualificationSel: any;
  hQualification: any;
  app: any;
  hGrade: any;
  hSchoolName: any;
  hCompletedSel: any;
  completionYr: any;
  hProgrammeYearSel: any;
  //highSchoolComletionYrSel: any;
  //highSchoolName: any;
  hCompleted: any;
  hProgrammeYear: any;
  data: any;
  pQualificationSel: any;
  pQualification: any;
  pGrade: any;
  pSchoolName: any;
  pCompletedSel: any;
  pProgrammeYearSel: any;
  pCompleted: any;
  pProgrammeYear: any;
  userId: any;
  id: any;
  englishTest: any;
  englishTestSel: any;

  constructor(
    public authenticationService: AuthenticationService,
    public loaderService: LoaderServiceService,
    private modalCtrl: ModalController,
    public router: Router,
    private alertService: AlertServiceService
  ) {}

  ngOnInit() {
    this.authenticationService.getCurrentUser().then(e => {
      this.userId = e.id;
      this.authenticationService.getStaticData().then(res => {
        this.quali = res.quali;
      });
      this.authenticationService.getApplication().then(app => {
        if (app) {
          this.hQualificationSel = app.hQualification;
          this.hGrade = app.hGrade;
          this.hSchoolName = app.hSchoolName;
          this.hCompletedSel = app.hCompleted;
          this.hProgrammeYearSel = app.hProgrammeYear;
          //this.highSchoolComletionYrSel = app.completionYr;
          //this.highSchoolName = app.highSchoolName;

          this.pQualificationSel = app.pQualification;
          this.pGrade = app.pGrade;
          this.pSchoolName = app.pSchoolName;
          this.pCompletedSel = app.pCompleted;
          this.pProgrammeYearSel = app.pProgrammeYear;
          this.id = app.id;
          this.englishTestSel = app.englishTest;
        }
      });
      this.authenticationService.getData().then((data: any) => {
        this.data = data;
      });
    });
  }

  getHQuali(event) {
    this.hQualification = event.target.text;
  }

  // getHighSchoolYear(event) {
  //   this.completionYr = event.target.text;
  // }
  getHProgramme(event) {
    this.hCompleted = event.target.text;
  }

  getPProgramme(event) {
    this.pCompleted = event.target.text;
  }
  getHYear(event) {
    this.hProgrammeYear = event.target.value;
  }
  getPYear(event) {
    this.pProgrammeYear = event.target.value;
  }
  getPQuali(event) {
    this.pQualification = event.target.text;
  }
  getEnglishTest(event) {
    this.englishTest = event.target.text;
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
    this.loaderService.showLoader("Saving ...");
    let f = new Application();
    f.hCompleted = form.value.hCompleted;
    f.hQualification = form.value.hQualification;
    f.hGrade = form.value.hGrade;
    f.hSchoolName = form.value.hSchoolName;
    f.hProgrammeYear = form.value.hProgrammeYear;
    //f.completionYr = form.value.completionYr;
    //f.highSchoolName = form.value.highSchoolName;

    f.pCompleted = form.value.pCompleted;
    f.pQualification = form.value.pQualification;
    f.pGrade = form.value.pGrade;
    f.pSchoolName = form.value.pSchoolName;
    f.pProgrammeYear = form.value.pProgrammeYear;
    f.englishTest = form.value.englishTest;
    f.userId = this.userId;
    f.applicationId = this.id;

    this.authenticationService.form3(f).subscribe(data => {
      if (!data.isError) {
        this.loaderService.hideLoader();
        this.router.navigate(["pages/fifthForm"]);
      } else {
        this.alertService.presentToast("Something went wrong!");
      }
    },
        error => {
          this.loaderService.hideLoader();
          this.alertService.presentToast("Server not available");
        });
  }
}
