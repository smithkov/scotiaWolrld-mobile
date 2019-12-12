import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { NavController, LoadingController } from "@ionic/angular";
import { AuthenticationService } from "./../../authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertServiceService } from "./../../alert-service.service";
import { environment } from "../../../environments/environment";
import { LoaderServiceService } from "./../../loader-service.service";

@Component({
  selector: "app-course",
  templateUrl: "./course.page.html",
  styleUrls: ["./course.page.scss"]
})
export class CoursePage implements OnInit {
  loading: any;
  avatarUrl: any;
  results: any;
  resultsCache: any;
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
    let facultyId = this.route.snapshot.paramMap.get("facultyId");
    let schoolId = this.route.snapshot.paramMap.get("schoolId");
    this.loaderService.showLoader("Loading ...");
    this.authenticationService.getCourses(facultyId, schoolId).subscribe(
      data => {
        this.loaderService.hideLoader();
        this.results = data.data;
        this.resultsCache = data.data;
      },
      error => {
        this.loaderService.hideLoader();
      }
    );
  }
  getFilter(evt: any) {
    let str = evt.target.value.trim().toUpperCase();
    console.log(str);
    if (str !== "") {
      let cache: any = [];

      this.resultsCache.forEach((item: any) => {
        let name = item.name;
        if (name.toUpperCase().includes(str)) {
          cache.push(item);
        }
      });
      if (cache.length === 0) {
        this.alertService.presentToast("No result found");
      } else {
        this.results = cache;
      }
    } else {
      this.results = this.resultsCache;
    }
  }
  courseDetail(course) {
    let courseString = JSON.stringify(course);
    this.authenticationService.saveData(course);
    this.router.navigate(["pages/course-detail", courseString]);
  }
}
