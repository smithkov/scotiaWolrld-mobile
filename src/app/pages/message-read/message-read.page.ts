import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { NavController, LoadingController } from "@ionic/angular";
import { AuthenticationService } from "./../../authentication.service";
import { AlertServiceService } from "./../../alert-service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-message-read",
  templateUrl: "./message-read.page.html",
  styleUrls: ["./message-read.page.scss"]
})
export class MessageReadPage implements OnInit {
  message: any;
  photoUrl: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    public authenticationService: AuthenticationService,
    public router: Router,
    public loadingController: LoadingController,
    private alertService: AlertServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.photoUrl = environment.photoUrl;
    this.message = JSON.parse(
      this.activatedRoute.snapshot.paramMap.get("msgObj")
    );
  }
}
