import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { NavController, LoadingController } from "@ionic/angular";
import { AuthenticationService } from "./../../authentication.service";
import { AlertServiceService } from "./../../alert-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-detail.page.html",
  styleUrls: ["./course-detail.page.scss"]
})
export class CourseDetailPage implements OnInit {
  data: any;
  avatarUrl: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    public authenticationService: AuthenticationService,
    public router: Router,
    public loadingController: LoadingController,
    private alertService: AlertServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.avatarUrl = environment.avatarUrl;
    this.data = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get("courseObj")
    );
  }
  form() {
    this.router.navigate(["/pages/firstForm"]);
  }
}
