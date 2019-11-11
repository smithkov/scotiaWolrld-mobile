import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../authentication.service";
import { Observable } from "rxjs";
import { LoaderServiceService } from "./../../loader-service.service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-university",
  templateUrl: "./university.page.html",
  styleUrls: ["./university.page.scss"]
})
export class UniversityPage implements OnInit {
  results: Observable<any>;
  loading: any;
  avatarUrl: any;
  constructor(
    public authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService
  ) {
    this.avatarUrl = environment.avatarUrl;
  }

  getSchools() {
    this.loaderService.showLoader("Loading ...");
    this.authenticationService.getSchools().subscribe(res => {
      this.loaderService.hideLoader();
      this.results = res;
      console.log(res);
    });
  }

  ngOnInit() {
    this.getSchools();
  }
}
