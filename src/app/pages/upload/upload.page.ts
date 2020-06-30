import { Component, OnInit } from "@angular/core";
import { Application } from "../../models/application";
import { AuthenticationService } from "./../../authentication.service";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { ModalController } from "@ionic/angular";
import { ModalPage } from "../modal/modal.page";
import { AlertServiceService } from "./../../alert-service.service";
import { LoaderServiceService } from "./../../loader-service.service";

import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { File } from "@ionic-native/file/ngx";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.page.html",
  styleUrls: ["./upload.page.scss"]
})
export class UploadPage implements OnInit {
  app: any;
  postalAddress: any;
  homeAddress: any;
  phone: any;
  id: any;
  fileName: any;
  fileType: any;
  userId: any;
  isPdf: Boolean = false;
  private returnPath: any;
  path: any;
  fileTransfer: FileTransferObject = this.transfer.create();
  constructor(
    private authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService,
    public router: Router,
    private alertService: AlertServiceService,
    private transfer: FileTransfer,
    private fileOpener: FileOpener,
    private file: File,
    private filePath: FilePath,

    private fileChooser: FileChooser
  ) {}

  ngOnInit() {
    this.authenticationService.getCurrentUser().then(e => {
      this.userId = e.id;
      this.authenticationService.getApplication().then(app => {
        if (app) {
          this.id = app.id;
        }
      });
    });
  }
  viewPdf() {
    this.fileOpener
      .showOpenWithDialog(this.returnPath, "application/pdf")
      .then(() => console.log("File is opened"))
      .catch(e => console.log("Error opening file", e));
  }
  pickFile() {
    this.fileChooser.open().then(fileuri => {
      this.path = fileuri;
      this.filePath.resolveNativePath(fileuri).then(resolvednativepath => {
        this.returnPath = resolvednativepath;
        this.fileName = this.returnPath.substring(
          this.returnPath.lastIndexOf("/") + 1
        );
        this.fileType = this.fileName.substring(
          this.fileName.lastIndexOf(".") + 1
        );
        if (this.fileType == "pdf") {
          this.isPdf = true;
        } else {
          this.isPdf = false;
          this.alertService.presentToast("File must be in PDF format!");
        }
      });
    });
  }
  skip(){
    this.router.navigate(["pages/finalForm"]);
  }
  upload() {
    this.loaderService.showLoader("Saving document ...");
    let options: FileUploadOptions = {
      fileKey: "credential",
      fileName: "name.pdf",
      params: { userId: this.userId, id: this.id },
      headers: {}
    };

    this.fileTransfer
      .upload(
        this.returnPath,
        `${environment.url}/application/mobileForm6`,
        options
      )
      .then(
        data => {
          this.loaderService.hideLoader();
          this.router.navigate(["pages/finalForm"]);
        },
        err => {
          this.loaderService.hideLoader();
          this.alertService.presentToast(
            "The server couldn't save this, try again later."
          );
        }
      );
  }
}
