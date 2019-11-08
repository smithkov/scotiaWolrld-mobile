import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthenticationService } from "./authentication.service";
import { HttpClientModule } from "@angular/common/http";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { ModalPageModule } from "../app/pages/modal/modal.module";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { File } from "@ionic-native/file/ngx";

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get("access_token");
    },
    whitelistedDomains: ["https://thescotiaworld.co.uk"]
  };
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ModalPageModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    FileChooser,
    FilePath,
    FileOpener,
    File,
    AuthenticationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
