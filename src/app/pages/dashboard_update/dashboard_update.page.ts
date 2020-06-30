import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../authentication.service";
import { environment } from "../../../environments/environment";
import { Storage } from "@ionic/storage";
import { AlertController, NavController } from "@ionic/angular";
import { AlertServiceService } from "../../alert-service.service";
import { Application } from "../../models/application";
import { LoaderServiceService } from "../../loader-service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-dashboard_update",
  templateUrl: "./dashboard_update.page.html",
  styleUrls: ["./dashboard_update.page.scss"]
})
export class DashboardUpdatePage implements OnInit {
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
  hasApplied = false;
  decision: any;
  hasRejected: Boolean;
  isShowNotificationIcon: any;
  totalNumUnread: any;
  messages: any;
  userId: any;
  eligibilityCheck: any;
  reqProvision: any;
  hasFinalSubmit: any;
  underReview: any;
  hasDecided: any;
  hasPaid: any;
  hasCas: any;
  applicationId: any;
  constructor(
    private auth: AuthenticationService,
    private storage: Storage,
    private loaderService: LoaderServiceService,
    public alertController: AlertController,
    public alertService: AlertServiceService,
    public router: Router,
    private navCtrl: NavController,
    public authenticationService: AuthenticationService
  ) {}
  ngOnInit() {
    this.initialLoad();
  }
  initialLoad() {
    this.authenticationService.getCurrentUser().then((user: any) => {
      this.username = user.username;
      this.userId = user.id;
      this.authenticationService.getMessages(user).subscribe(msg => {
        this.messages = msg.data;
        this.totalNumUnread = this.getUnread();
        this.isShowNotificationIcon = this.totalNumUnread > 0 ? true : false;
      });
    });
    this.authenticationService.getApplication().then(data => {
      if (data) {
        this.applicationId = data.id;
        this.hasApplied = true;
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
  async remove() {
    const alert = await this.alertController.create({
      header: "Application Deletion!",
      message: "Do you wish to delete the current application?",
      buttons: [
        {
          text: "No",
          role: "no",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.loaderService.showLoader("Removing ...");
            let f = new Application();
            f.applicationId = this.applicationId;
            f.userId = this.userId;
            this.authenticationService.removeApplication(f).subscribe(
              result => {
                this.loaderService.hideLoader();

                if (result.error) {
                  this.alertService.presentToast(
                    "Could not remove application"
                  );
                } else {
                  this.alertService.presentToast("Removed successfully");
                  this.navCtrl.navigateRoot("/main/landing");
                }
              },
              error => {
                this.alertService.presentToast("Could not remove application");
                this.loaderService.hideLoader();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.auth.logout();
  }
  getUnread() {
    return this.messages.filter(x => !x.hasRead).length;
  }
}
