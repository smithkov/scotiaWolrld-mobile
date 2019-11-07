import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../authentication.service";
import { Storage } from "@ionic/storage";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  username: string;
  constructor(
    private auth: AuthenticationService,
    private storage: Storage,
    public authenticationService: AuthenticationService
  ) {
    this.authenticationService.getCurrentUser().then((user: any) => {
      this.username = user.username;
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {}
}
