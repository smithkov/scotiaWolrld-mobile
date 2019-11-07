import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { AuthenticationService } from "./../../authentication.service";
import { Observable } from "rxjs";
import { LoaderServiceService } from "./../../loader-service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.page.html",
  styleUrls: ["./modal.page.scss"]
})
export class ModalPage implements OnInit {
  results: Observable<any>;
  courses: Observable<any>;
  loading: any;
  avatarUrl: any;
  isShoWSchool: boolean;
  isShoWCourse: boolean;
  isShoWDetail: boolean;
  data: any;
  title: any;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService
  ) {}

  ngOnInit() {
    this.title = "Intitutions";
    this.avatarUrl = environment.avatarUrl;
    this.isShoWDetail = false;
    this.getSchools();
  }

  getSchools() {
    if (this.results === undefined) {
      this.isShoWSchool = true;
      this.isShoWCourse = false;
      this.isShoWDetail = false;
      this.loaderService.showLoader("Loading ...");
      this.authenticationService.getSchools().subscribe(res => {
        this.loaderService.hideLoader();
        this.results = res;
      });
    }
  }
  getCourses(facultyId, schoolId) {
    this.isShoWSchool = false;
    this.isShoWCourse = true;
    this.isShoWDetail = false;
    this.loaderService.showLoader("Loading ...");
    this.authenticationService.getCourses(facultyId, schoolId).subscribe(
      data => {
        this.loaderService.hideLoader();
        this.courses = data.data;
        this.title = data.data[0].Institution.name;
      },
      error => {
        this.loaderService.hideLoader();
      }
    );
  }
  closeCourse() {
    this.isShoWSchool = true;
    this.isShoWCourse = false;
    this.courses = null;
  }
  closeDetail() {
    this.isShoWCourse = true;
    this.isShoWDetail = false;
    //this.data = null;
  }
  courseDetail(course) {
    this.title = course.name;
    this.isShoWSchool = false;
    this.isShoWCourse = false;
    this.isShoWDetail = true;
    this.data = course;
    //this.authenticationService.saveData(course);
  }
  async closeModal() {
    const onClosedData: any = this.data;
    await this.modalController.dismiss(onClosedData);
  }
  select() {
    this.authenticationService.saveData(this.data);
    this.closeModal();
  }
}
