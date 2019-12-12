import { Component, OnInit } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { AuthenticationService } from "./../../authentication.service";
import { environment } from "../../../environments/environment";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  selectedPath = "";
  username: any;
  roleId: any;

  photoUrl: any;
  constructor(
    private router: Router,
    private iab: InAppBrowser,
    private authenticationService: AuthenticationService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser().then((user: any) => {
      this.username = user.username;
      this.roleId = user.roleId;

      this.photoUrl = user.photo
        ? environment.photoUrl + user.photo
        : environment.defaultPhoto;
    });
  }
  openBrowser() {
    this.iab.create("https://scotstudy.co.uk");
  }
  logout() {
    this.authenticationService.logout();
  }
}
