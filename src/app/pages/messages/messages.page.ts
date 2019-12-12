import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../authentication.service";
import { Storage } from "@ionic/storage";
import { NavController, LoadingController } from "@ionic/angular";
import { environment } from "../../../environments/environment";
import { LoaderServiceService } from "./../../loader-service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"]
})
export class MessagesPage implements OnInit {
  messages: any;
  photoUrl: any;
  roleId: any;
  constructor(
    private auth: AuthenticationService,
    private navCtrl: NavController,
    public router: Router,
    private storage: Storage,
    private loaderService: LoaderServiceService,
    public authenticationService: AuthenticationService
  ) {
    this.loaderService.showLoader("Loading ...");
    this.photoUrl = environment.photoUrl;
    this.authenticationService.getCurrentUser().then((user: any) => {
      this.authenticationService.getMessages(user).subscribe(msg => {
        this.loaderService.hideLoader();
        this.messages = msg.data;
        this.roleId = user.roleId;
      });
    });
  }

  ngOnInit() {}

  read(message) {
    let messageString = JSON.stringify(message);
    if (!message.hasRead) {
      this.authenticationService
        .markMessageAsRead(message.id)
        .subscribe(result => {
          console.log(result);
          this.router.navigate(["pages/message-read", messageString]);
        });
    } else {
      this.router.navigate(["pages/message-read", messageString]);
    }
  }
  compose() {
    this.router.navigate(["/pages/compose"]);
  }
}
