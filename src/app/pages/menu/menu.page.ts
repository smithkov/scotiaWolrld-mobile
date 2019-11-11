import { Component, OnInit } from "@angular/core";
import { Router, RouterEvent } from "@angular/router";
import { AuthenticationService } from "./../../authentication.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {
  selectedPath = "";
  username: any;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser().then((user: any) => {
      this.username = user.username;
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
