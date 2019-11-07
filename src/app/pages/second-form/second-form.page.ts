import { Component, OnInit } from "@angular/core";
import { Application } from "../../models/application";
import { AuthenticationService } from "./../../authentication.service";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
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
  selector: "app-second-form",
  templateUrl: "./second-form.page.html",
  styleUrls: ["./second-form.page.scss"]
})
export class SecondFormPage implements OnInit {
  app: any;
  postalAddress: any;
  homeAddress: any;
  phone: any;
  id: any;
  userId: any;
  private returnPath: any;
  path: any;
  fileTransfer: FileTransferObject = this.transfer.create();
  constructor(
    private authenticationService: AuthenticationService,
    private loaderService: LoaderServiceService,
    public router: Router,
    private alertService: AlertServiceService,
    private transfer: FileTransfer,
    private file: File,
    private filePath: FilePath,

    private fileChooser: FileChooser
  ) {}

  ngOnInit() {
    this.loaderService.showLoader("Loading ...");
    this.authenticationService.getCurrentUser().then(e => {
      this.userId = e.id;
      this.authenticationService.formOne(e.id).subscribe(data => {
        this.loaderService.hideLoader();
        if (data.app) {
          this.id = data.app.id;
        }
      });
    });
  }
  pickFile() {
    this.fileChooser.open().then(fileuri => {
      this.path = fileuri;
      this.filePath.resolveNativePath(fileuri).then(resolvednativepath => {
        this.returnPath = resolvednativepath;
      });
    });
  }
  upload() {
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
          alert("success");
        },
        err => {
          alert(JSON.stringify(err));
        }
      );
  }
  save(form: NgForm) {
    let f = new Application();
    f.homeAddress = form.value.homeAddress;
    f.postalAddress = form.value.postalAddress;
    f.phone = form.value.postalAddress;
    f.applicationId = form.value.id;
    f.userId = this.userId;
    this.authenticationService.form2(f).subscribe(data => {
      if (!data.isError) {
        this.loaderService.hideLoader();
        this.router.navigate(["third-form"]);
      } else {
        this.alertService.presentToast("Something went wrong!");
      }
    });
  }
}
