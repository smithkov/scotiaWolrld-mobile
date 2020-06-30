import { Component, OnInit } from "@angular/core";
import { Application } from "../../models/application";
import { AuthenticationService } from "./../../authentication.service";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { AlertServiceService } from "./../../alert-service.service";
import { LoaderServiceService } from "./../../loader-service.service";

import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: "app-first-form",
  templateUrl: "./first-form.page.html",
  styleUrls: ["./first-form.page.scss"],
})
export class FirstFormPage implements OnInit {
  quali: Observable<any>;
  country: Observable<any>;
  selected: any;
  countryId: any;
  id: any;
  app: any;
  selectedDOB: any;
  userId: any;
  selectedGender: any;
  selectedMarital: any;
  selectedFn: any;
  selectedMn: any;
  selectedLn: any;
  dataReturned: any;
  data: any;
  // isForm1: boolean;
  // isForm2: boolean;
  // isForm3: boolean;
  // isForm4: boolean;
  // isForm5: boolean;
  hQualificationSel: any;
  hQualification: any;
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
  englishTest: any;
  englishTestSel: any;

  postalAddress: any;
  homeAddress: any;
  phone: any;

  hasAppliedSel: any;
  hasApplied: any;
  purpose: any;
  reasonOfRefusal: any;
  moreInfo: any;
  uploadText: any;
  private returnPath: any;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(
    public authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService,
    public router: Router,
    private alertService: AlertServiceService,
    private modalCtrl: ModalController,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,

    private fileChooser: FileChooser
  ) {}

  ngOnInit() {
    try {
      this.loaderService.showLoader("Loading ...");
      // this.showForm();
      this.authenticationService.getCurrentUser().then((e) => {
        this.userId = e.id;
        this.authenticationService.formOne(e.id).subscribe((data) => {
          
          this.loaderService.hideLoader();
          this.country = data.countries;
          if (data.app) {
            this.quali = data.quali;
            this.selected = data.app.Country.name;
            this.selectedDOB = data.app.dob;
            this.id = data.app.id;
            this.selectedGender = data.app.gender;
            this.selectedMarital = data.app.marital;
            this.selectedFn = data.app.firstname;
            this.selectedMn = data.app.middlename;
            this.selectedLn = data.app.lastname;
            let course = data.course;
            //caches course to data
            this.data = course;
            this.authenticationService.saveData(course);
          } else {
            this.loaderService.hideLoader();
            this.authenticationService.getData().then((data: any) => {
              this.data = data;
            });
          }
        }, (err) => {this.loaderService.hideLoader();});
      });
      //this gets stored institution
    } catch (err) {
      this.loaderService.hideLoader();
    }
  }

  showForm() {}
  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== undefined) {
        console.log(dataReturned);
        this.data = dataReturned.data;
      }
    });
    await modal.present();
  }
  // getHQuali(event) {
  //   this.hQualification = event.target.text;
  // }
  // getHProgramme(event) {
  //   this.hCompleted = event.target.text;
  // }

  // getPProgramme(event) {
  //   this.pCompleted = event.target.text;
  // }
  // getHYear(event) {
  //   this.hProgrammeYear = event.target.value;
  // }
  // getPYear(event) {
  //   this.pProgrammeYear = event.target.value;
  // }
  // getPQuali(event) {
  //   this.pQualification = event.target.text;
  // }
  // getEnglishTest(event) {
  //   this.englishTest = event.target.text;
  // }

  // getHasApplied(event) {
  //   this.hasApplied = event.target.text;
  // }
  saveForm1(form: NgForm) {
    let getCourse = this.data;
    this.loaderService.showLoader("Saving ...");
    let f = new Application();
    f.firstname = form.value.firstname;
    f.middlename = form.value.middlename;
    f.lastname = form.value.lastname;
    f.userId = this.userId;
    f.marital = form.value.marital;
    f.gender = form.value.gender;
    f.dob = form.value.dob;
    f.countryId = form.value.countryId;
    f.courseId = getCourse.id;
    // f.course1 = getCourse.id;
    // f.course2 = getCourse.name;
    // f.schoolWish1 = getCourse.Institution.name;
    // f.schoolWish2 = getCourse.Institution.name;
    // f.level = getCourse.DegreeType.name;
    // f.cityId = getCourse.Institution.cityId;

    f.applicationId = form.value.id;
    this.authenticationService.form1(f).subscribe(
      (data) => {
        if (!data.isError) {
          this.loaderService.hideLoader();
          this.router.navigate(["/pages/secondForm"]);
          //this.showForm(false, true, false, false, false);
        } else {
          this.alertService.presentToast("Something went wrong!");
        }
      }
    ),
    (err) => {
      this.loaderService.hideLoader();
      this.alertService.presentToast("Server not available");
    };
  }
  // saveForm2(form: NgForm) {
  //   let f = new Application();
  //   f.homeAddress = form.value.homeAddress;
  //   f.postalAddress = form.value.postalAddress;
  //   f.phone = form.value.postalAddress;
  //   f.applicationId = form.value.id;
  //   f.userId = this.userId;
  //   this.loaderService.showLoader("Saving ...");
  //   this.authenticationService.form2(f).subscribe(data => {
  //     if (!data.isError) {
  //       this.loaderService.hideLoader();
  //       this.showForm(false, false, true, false, false);
  //     } else {
  //       this.alertService.presentToast("Something went wrong!");
  //     }
  //   });
  // }
  // saveForm3(form: NgForm) {
  //   let f = new Application();
  //   f.hCompleted = form.value.hCompleted;
  //   f.hQualification = form.value.hQualification;
  //   f.hGrade = form.value.hGrade;
  //   f.hSchoolName = form.value.hSchoolName;
  //   f.hProgrammeYear = form.value.hProgrammeYear;

  //   f.pCompleted = form.value.pCompleted;
  //   f.pQualification = form.value.pQualification;
  //   f.pGrade = form.value.pGrade;
  //   f.pSchoolName = form.value.pSchoolName;
  //   f.pProgrammeYear = form.value.pProgrammeYear;
  //   f.englishTest = form.value.englishTest;
  //   f.userId = this.userId;
  //   f.applicationId = form.value.id;
  //   this.loaderService.showLoader("Saving ...");
  //   this.authenticationService.form3(f).subscribe(data => {
  //     if (!data.isError) {
  //       this.loaderService.hideLoader();
  //       this.showForm(false, false, false, true, false);
  //     } else {
  //       this.alertService.presentToast("Something went wrong!");
  //     }
  //   });
  // }
  // saveForm4(form: NgForm) {
  //   this.loaderService.showLoader("Saving ...");
  //   this.showForm(false, false, false, false, true);
  //   let f = new Application();
  //   f.moreInfo = form.value.moreInfo;
  //   f.purpose = form.value.purpose;
  //   f.hasApplied = form.value.hasApplied;
  //   f.reasonOfRefusal = form.value.reasonOfRefusal;
  //   f.userId = this.userId;
  //   f.applicationId = this.id;

  //   this.authenticationService.form5(f).subscribe(data => {
  //     if (!data.isError) {
  //       this.loaderService.hideLoader();
  //       //this.router.navigate(["forth-form"]);
  //       this.alertService.presentToast("Saved!");
  //       this.router.navigate(["/pages/secondForm"]);
  //     } else {
  //       this.alertService.presentToast("Something went wrong!");
  //     }
  //   });
  // }

  getCountry(event) {
    this.countryId = event.target;
  }
  getDOB(event) {
    this.selectedDOB = event.target.value;
  }
  getGender(event) {
    this.selectedGender = event.target.value;
  }
  getMarital(event) {
    this.selectedMarital = event.target.value;
  }
}
