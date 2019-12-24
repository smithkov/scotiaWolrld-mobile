import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
  NavController,
  LoadingController,
  IonInfiniteScroll
} from "@ionic/angular";
import { AuthenticationService } from "./../../authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertServiceService } from "./../../alert-service.service";
import { environment } from "../../../environments/environment";
import { LoaderServiceService } from "./../../loader-service.service";

@Component({
  selector: "app-coursenew",
  templateUrl: "./coursenew.page.html",
  styleUrls: ["./coursenew.page.scss"]
})
export class CoursenewPage implements OnInit {
  pageSize: any = 10;
  offset: any = 0;
  searchParam: any = null;
  isLoader: any = false;
  results: any;
  avatarUrl: any;
  constructor(
    private navCtrl: NavController,
    public authenticationService: AuthenticationService,
    public router: Router,
    public loadingController: LoadingController,
    private alertService: AlertServiceService,
    private route: ActivatedRoute,
    private loaderService: LoaderServiceService
  ) {
    this.avatarUrl = environment.avatarUrl;
    this.courses();
  }
  ngOnInit() {}

  courses() {
    this.loaderService.showLoader("Loading ...");
    this.authenticationService
      .paginatedCourse(this.offset, this.pageSize, false)
      .subscribe(
        data => {
          this.loaderService.hideLoader();
          this.results = data;
        },
        error => {
          this.loaderService.hideLoader();
        }
      );
  }
  doRefresh(event) {
    this.courses();
    event.target.complete();
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
  courseDetail(course) {
    let courseString = JSON.stringify(course);
    this.authenticationService.saveData(course);
    this.router.navigate(["pages/course-detail", courseString]);
  }
}
