import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../authentication.service";
import { Storage } from "@ionic/storage";
import { NavController, LoadingController } from "@ionic/angular";
import { environment } from "../../../environments/environment";
import { LoaderServiceService } from "./../../loader-service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-message-sent",
  templateUrl: "./message-sent.page.html",
  styleUrls: ["./message-sent.page.scss"]
})
export class MessageSentPage implements OnInit {
  messages: any;
  constructor(
    private auth: AuthenticationService,
    private navCtrl: NavController,
    public router: Router,
    private storage: Storage,
    private loaderService: LoaderServiceService,
    public authenticationService: AuthenticationService
  ) {
    this.loaderService.showLoader("Loading ...");

    this.authenticationService.getCurrentUser().then((user: any) => {
      this.authenticationService.sentMessages(user.id).subscribe(msg => {
        this.loaderService.hideLoader();
        this.messages = msg.data;
      });
    });
  }
  read(message) {
    let messageString = JSON.stringify(message);

    this.router.navigate(["pages/message-read", messageString]);
  }
  ngOnInit() {}
}
