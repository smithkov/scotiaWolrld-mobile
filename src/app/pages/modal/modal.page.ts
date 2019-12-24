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
  results: any;
  offset: any = 0;
  pageSize: any = 10;
  loading: any;
  avatarUrl: any;
  isShoWSchool: boolean;
  isShoWCourse: boolean;
  isShoWDetail: boolean;
  data: any;
  title: any;
  searchParam: any = null;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    public authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService
  ) {
    this.avatarUrl = environment.avatarUrl;
  }

  ngOnInit() {
    this.title = "All Courses";
    this.avatarUrl = environment.avatarUrl;
    this.courses();
    this.isShoWCourse = true;
    this.isShoWDetail = false;
    //this.getSchools();
  }
  doRefresh(event) {
    this.courses();
    event.target.complete();
  }
  // getSchools() {
  //   if (this.results === undefined) {
  //     this.isShoWSchool = true;
  //     this.isShoWCourse = false;
  //     this.isShoWDetail = false;
  //     this.loaderService.showLoader("Loading ...");
  //     this.authenticationService.getSchools().subscribe(res => {
  //       this.loaderService.hideLoader();
  //       this.results = res;
  //     });
  //   }
  // }
  // getCourses(facultyId, schoolId) {
  //   console.log(`facultyId   ${facultyId}   School :  ${schoolId}`);
  //   this.isShoWSchool = false;
  //   this.isShoWCourse = true;
  //   this.isShoWDetail = false;
  //   this.loaderService.showLoader("Loading ...");
  //   this.authenticationService.getCourses(facultyId, schoolId).subscribe(
  //     data => {
  //       this.loaderService.hideLoader();
  //       this.courses = data.data;
  //       this.title = data.data[0].Institution.name;
  //     },
  //     error => {
  //       this.loaderService.hideLoader();
  //     }
  //   );
  // }
  courses() {
    this.isShoWDetail = false;
    this.isShoWCourse = true;
    this.loaderService.showLoader("Loading ...");
    this.authenticationService
      .paginatedCourse(this.offset, this.pageSize, false)
      .subscribe(
        data => {
          console.log(data);
          this.loaderService.hideLoader();
          this.results = data;
        },
        error => {
          this.loaderService.hideLoader();
        }
      );
  }

  loadData(event) {
    this.offset += this.pageSize;

    this.authenticationService
      .paginatedCourse(this.offset, this.pageSize, this.searchParam)
      .subscribe(
        data => {
          event.target.complete();
          this.results = this.results.concat(data);
        },
        error => {
          event.target.complete();
        }
      );
  }

  getFilter(evt: any) {
    this.searchParam = evt.target.value;
    this.offset = 0;
    this.authenticationService
      .paginatedCourse(this.offset, this.pageSize, this.searchParam)
      .subscribe(
        data => {
          this.results = data;
        },
        error => {}
      );
  }
  // closeCourse() {
  //   this.isShoWSchool = true;
  //   this.isShoWCourse = false;
  //   this.courses = null;
  // }
  closeDetail() {
    this.isShoWCourse = true;
    this.isShoWDetail = false;
    //this.data = null;
  }
  courseDetail(course) {
    this.title = course.name;
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
