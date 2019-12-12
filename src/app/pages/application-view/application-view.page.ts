import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./../../authentication.service";
import { environment } from "../../../environments/environment";
import { File } from "@ionic-native/file/ngx";
import { LoaderServiceService } from "./../../loader-service.service";
import {
  FileTransfer,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

@Component({
  selector: "app-application-view",
  templateUrl: "./application-view.page.html",
  styleUrls: ["./application-view.page.scss"]
})
export class ApplicationViewPage implements OnInit {
  app: any;
  credentialPath: any;
  credentialName: any;
  private returnPath: any;
  fileTransfer: FileTransferObject;
  constructor(
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private file: File,
    private loaderService: LoaderServiceService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.getApplication().then(application => {
      this.app = application;
      this.credentialName = application.credential;
      this.credentialPath = `${environment.url}/credentials/${application.credential}`;
    });
  }

  download() {
    this.loaderService.showLoader("Opening PDF document ...");
    this.fileTransfer = this.transfer.create();
    this.fileTransfer
      .download(
        this.credentialPath,
        this.file.dataDirectory + this.credentialName
      )
      .then(entry => {
        console.log("download complete: " + entry.toURL());
        this.fileOpener
          .open(entry.toURL(), "application/pdf")
          .then(() => console.log("File is opened"))
          .catch(e => console.log("Error opening file", e));
      });
    this.loaderService.hideLoader();
  }
}
