import { Component, OnInit } from "@angular/core";
import { Application } from "../../models/application";
import { AuthenticationService } from "./../../authentication.service";
import { Observable } from "rxjs";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertServiceService } from "./../../alert-service.service";
import { LoaderServiceService } from "./../../loader-service.service";

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
  hProgrammeYearSel: any;
  hCompleted: any;
  hProgrammeYear: any;

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
    private loaderService: LoaderServiceService,
    public router: Router,
    private alertService: AlertServiceService
  ) {}

  ngOnInit() {
    this.loaderService.showLoader("Loading ...");
    this.authenticationService.getCurrentUser().then(e => {
      this.userId = e.id;
      this.authenticationService.formOne(e.id).subscribe(data => {
        this.loaderService.hideLoader();
        this.quali = data.quali;
        if (data.app) {
          this.hQualificationSel = data.app.hQualification;
          this.hGrade = data.app.hGrade;
          this.hSchoolName = data.app.hSchoolName;
          this.hCompletedSel = data.app.hCompleted;
          this.hProgrammeYearSel = data.app.hProgrammeYear;

          this.pQualificationSel = data.app.pQualification;
          this.pGrade = data.app.pGrade;
          this.pSchoolName = data.app.pSchoolName;
          this.pCompletedSel = data.app.pCompleted;
          this.pProgrammeYearSel = data.app.pProgrammeYear;
          this.id = data.app.id;
          this.englishTestSel = data.app.englishTest;
        }
      });
    });
  }

  getHQuali(event) {
    this.hQualification = event.target.text;
  }
  getHProgramme(event) {
    this.hCompleted = event.target.text;
  }

  getPProgramme(event) {
    this.pCompleted = event.target.text;
  }
  getHYear(event) {
    console.log(event);
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
  save(form: NgForm) {
    this.loaderService.showLoader("Saving ...");
    let f = new Application();
    f.hCompleted = form.value.hCompleted;
    f.hQualification = form.value.hQualification;
    f.hGrade = form.value.hGrade;
    f.hSchoolName = form.value.hSchoolName;
    f.hProgrammeYear = form.value.hProgrammeYear;

    f.pCompleted = form.value.pCompleted;
    f.pQualification = form.value.pQualification;
    f.pGrade = form.value.pGrade;
    f.pSchoolName = form.value.pSchoolName;
    f.pProgrammeYear = form.value.pProgrammeYear;
    f.englishTest = form.value.englishTest;
    f.userId = this.userId;
    f.applicationId = form.value.id;

    this.authenticationService.form3(f).subscribe(data => {
      if (!data.isError) {
        this.loaderService.hideLoader();
        this.router.navigate(["forth-form"]);
      } else {
        this.alertService.presentToast("Something went wrong!");
      }
    });
  }
}
