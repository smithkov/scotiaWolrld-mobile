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
  hasSubmitted: any;
  hasSubmittedBool: Boolean = false;
  isApply: any = true;
  decision: any;
  constructor(
    private auth: AuthenticationService,
    private storage: Storage,
    public authenticationService: AuthenticationService
  ) {
    this.authenticationService.getCurrentUser().then((user: any) => {
      this.username = user.username;
      this.authenticationService.formOne(user.id).subscribe(data => {
        console.log(data);
        if (data.app) {
          this.hasSubmittedBool = data.app.hasSubmitted;
          this.hasSubmitted = data.app.hasSubmitted
            ? "SUBMITTED"
            : "NOT SUBMITTED";
          this.decision = data.app.decision;
          this.isApply = !data.app.hasSubmitted;
        } else {
          this.hasSubmitted = "NOT STARTED";
          this.hasSubmittedBool = false;
        }
      });
    });
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this;
  }
}
