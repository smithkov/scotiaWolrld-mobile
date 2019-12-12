import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../authentication.service";
import { environment } from "../../../environments/environment";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  acceptedImg = environment.url + "/accepted.png";
  pendingImg = environment.url + "/pending.png";
  pendingImg2 = environment.url + "/pending2.png";
  rejectImg = environment.url + "/reject.png";
  decisionImage: any;
  offer = environment.url + "/offer.png";
  hasLoaded: Boolean = false;
  username: string;
  hasSubmitted: any;
  isShowContBtn: Boolean;
  hasSubmittedBool: Boolean = false;
  isApply: any = true;
  decision: any;
  hasRejected: Boolean;
  isShowNotificationIcon: any;
  totalNumUnread: any;
  messages: any;

  eligibilityCheck: any;
  reqProvision: any;
  hasFinalSubmit: any;
  underReview: any;
  hasDecided: any;
  hasPaid: any;
  hasCas: any;
  constructor(
    private auth: AuthenticationService,
    private storage: Storage,
    public authenticationService: AuthenticationService
  ) {
    this.authenticationService.getCurrentUser().then((user: any) => {
      this.username = user.username;
      this.authenticationService.getMessages(user).subscribe(msg => {
        this.messages = msg.data;
        this.totalNumUnread = this.getUnread();
        this.isShowNotificationIcon = this.totalNumUnread > 0 ? true : false;
      });
    });
    this.authenticationService.getApplication().then(data => {
      if (data) {
        this.hasSubmittedBool = data.hasSubmitted;
        this.hasSubmitted = data.hasSubmitted
          ? this.acceptedImg
          : this.pendingImg;
        this.decision = data.decision;
        this.isShowContBtn = !data.hasSubmitted;
        this.isApply = false;
        this.decisionImage =
          data.decision == "Application Rejected" ? this.rejectImg : this.offer;
        this.hasRejected =
          data.decision == "Application Rejected" ? true : false;

        this.eligibilityCheck = data.eligibilityCheck
          ? this.acceptedImg
          : this.pendingImg;
        this.reqProvision = data.reqProvision
          ? this.acceptedImg
          : this.pendingImg;
        this.hasFinalSubmit = data.hasFinalSubmit
          ? this.acceptedImg
          : this.pendingImg;
        this.underReview = data.hasFinalSubmit
          ? this.acceptedImg
          : this.pendingImg;
        this.hasDecided = data.hasDecided;
        this.hasPaid = data.hasPaid ? this.acceptedImg : this.pendingImg;
        this.hasCas = data.hasCas ? this.acceptedImg : this.pendingImg;
        this.hasLoaded = true;
      } else {
        this.hasSubmitted = this.pendingImg;

        this.eligibilityCheck = this.pendingImg;
        this.reqProvision = this.pendingImg;
        this.hasFinalSubmit = this.pendingImg;
        this.underReview = this.pendingImg;
        this.hasDecided = this.pendingImg;
        this.hasPaid = this.pendingImg;
        this.hasCas = this.pendingImg;
        this.hasLoaded = true;
        this.hasSubmittedBool = false;
      }
    });
  }

  logout() {
    this.auth.logout();
  }
  getUnread() {
    return this.messages.filter(x => !x.hasRead).length;
  }
  ngOnInit() {
    this;
  }
}
