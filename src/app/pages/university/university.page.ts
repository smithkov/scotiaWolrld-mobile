import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../authentication.service";
import { Observable } from "rxjs";
import { LoaderServiceService } from "./../../loader-service.service";
import { environment } from "../../../environments/environment";
import { AlertServiceService } from "./../../alert-service.service";

@Component({
  selector: "app-university",
  templateUrl: "./university.page.html",
  styleUrls: ["./university.page.scss"]
})
export class UniversityPage implements OnInit {
  results: any;
  resultsCache: Observable<any>;
  loading: any;
  avatarUrl: any;
  constructor(
    public authenticationService: AuthenticationService,
    private alertService: AlertServiceService,
    private loaderService: LoaderServiceService
  ) {
    this.avatarUrl = environment.avatarUrl;
  }

  getSchools() {
    this.loaderService.showLoader("Loading ...");
    this.authenticationService.getSchools().subscribe(res => {
      this.loaderService.hideLoader();
      this.results = res;
      this.resultsCache = res;
      console.log(res);
    });
  }

  getFilter(evt: any) {
    let str = evt.target.value.trim().toUpperCase();
    console.log(str);
    if (str !== "") {
      let cache: any = [];

      this.resultsCache.forEach((item: any) => {
        let uniName = item.uni.name;
        if (uniName.toUpperCase().includes(str)) {
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

  ngOnInit() {
    this.getSchools();
  }
}
