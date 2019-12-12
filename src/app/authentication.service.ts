import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Platform, AlertController, NavController } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from "@ionic/storage";
import { environment } from "../environments/environment";
import { tap, catchError, map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { Application } from "../app/models/application";

const TOKEN_KEY = "access_token";
const USER_KEY = "user_data";
const APP_KEY = "app_data";
const STATIC_DATA_KEY = "static_data";

const SCHOOL_KEY = "school_key";
const DATA_KEY = "data_key";
const PUSH_PLAYER_KEY = "push_player_key";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  baseUrl = environment.url;
  user = null;

  authenticationState = new BehaviorSubject(false);

  constructor(
    public http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }
  getCurrentUser() {
    return this.storage.get(USER_KEY).then(user => {
      return user;
    });
  }
  //static data includes qualifcation, countries, degree etc
  getStaticData() {
    return this.storage.get(STATIC_DATA_KEY).then(data => {
      return data;
    });
  }

  getPushPlayerId() {
    return this.storage.get(PUSH_PLAYER_KEY).then(id => {
      return id;
    });
  }

  getSchool() {
    return this.storage.get(USER_KEY).then(user => {
      return user;
    });
  }

  getApplication() {
    return this.storage.get(APP_KEY).then(app => {
      return app;
    });
  }
  getData() {
    return this.storage.get(DATA_KEY).then(data => {
      return data;
    });
  }
  getPush() {
    return this.storage.get(PUSH_PLAYER_KEY).then(data => {
      return data;
    });
  }
  saveData(data) {
    this.storage.set(DATA_KEY, data);
  }
  savePush(pushId) {
    this.storage.set(PUSH_PLAYER_KEY, pushId);
  }
  getMessages(user): Observable<any> {
    return this.http
      .post(this.baseUrl + "/user/getMessageByUser", {
        user: user
      })
      .pipe(
        tap((results: any) => {
          return results.data;
        }),
        catchError(e => {
          console.log(e.error.msg);
          throw new Error(e);
        })
      );
  }
  markMessageAsRead(messageId): Observable<any> {
    return this.http
      .post(this.baseUrl + "/user/markAsRead", {
        messageId: messageId
      })
      .pipe(
        tap((results: any) => {
          return results;
        }),
        catchError(e => {
          throw new Error(e);
        })
      );
  }
  compose(message, subject, senderId): Observable<any> {
    return this.http
      .post(this.baseUrl + "/user/sendAdminMessage", {
        message: message,
        subject: subject,
        userId: senderId
      })
      .pipe(
        tap((results: any) => {
          return results;
        }),
        catchError(e => {
          throw new Error(e);
        })
      );
  }
  sentMessages(userId): Observable<any> {
    return this.http
      .post(this.baseUrl + "/user/getSentMessages", {
        userId: userId
      })
      .pipe(
        tap((results: any) => {
          return results;
        }),
        catchError(e => {
          throw new Error(e);
        })
      );
  }
  login(username, password, pushId): Observable<any> {
    return this.http
      .post(this.baseUrl + "/user/mobileLogin", {
        username: username,
        password: password,
        pushId: pushId
      })
      .pipe(
        tap(results => {
          this.storage.set(TOKEN_KEY, results["token"]);
          this.storage.set(USER_KEY, results["user"]);
          this.storage.set(APP_KEY, results["app"]);
          this.user = this.helper.decodeToken(results["token"]);
          this.authenticationState.next(true);

          return results;
        }),
        catchError(e => {
          console.log(e.error.msg);
          throw new Error(e);
        })
      );
  }
  form1(app: Application): Observable<any> {
    return this.http
      .post(this.baseUrl + "/application/mobileForm1", {
        firstname: app.firstname,
        id: app.applicationId,
        middlename: app.middlename,
        lastname: app.lastname,
        countryId: app.countryId,
        dob: app.dob,
        userId: app.userId,
        marital: app.marital,
        gender: app.gender,
        courseId: app.courseId
        // course1: app.course1,
        // course2: app.course2,
        // schoolWish1: app.schoolWish1,
        // schoolWish2: app.schoolWish2,
        // cityId: app.cityId
        //level: app.level
      })
      .pipe(
        tap(results => {
          let app = results["app"];
          console.log(app);
          if (app) this.storage.set(APP_KEY, app);
          return results;
        }),
        catchError(e => {
          throw new Error(e);
        })
      );
  }
  form2(app: Application): Observable<any> {
    return this.http
      .post(this.baseUrl + "/application/mobileForm2", {
        homeAddress: app.homeAddress,
        id: app.applicationId,
        userId: app.userId,
        postalAddress: app.postalAddress,
        phone: app.phone
      })
      .pipe(
        tap(results => {
          let app = results["app"];
          if (app) this.storage.set(APP_KEY, app);
          return results;
        }),
        catchError(e => {
          //console.log(e.error.msg);
          throw new Error(e);
        })
      );
  }
  form3(app: Application): Observable<any> {
    return this.http
      .post(this.baseUrl + "/application/mobileForm3", {
        id: app.applicationId,
        userId: app.userId,
        hQualification: app.hQualification,
        hGrade: app.hGrade,
        hSchoolName: app.hSchoolName,
        hCompleted: app.hCompleted,
        hProgrammeYear: app.hProgrammeYear,

        pQualification: app.pQualification,
        pGrade: app.pGrade,
        pSchoolName: app.pSchoolName,
        pCompleted: app.pCompleted,
        pProgrammeYear: app.pProgrammeYear,
        completionYr: app.completionYr,
        highSchoolName: app.highSchoolName,
        englishTest: app.englishTest
      })
      .pipe(
        tap(results => {
          let app = results["app"];
          if (app) this.storage.set(APP_KEY, app);
          return results;
        }),
        catchError(e => {
          throw new Error(e);
        })
      );
  }
  form4(app: Application): Observable<any> {
    return this.http
      .post(this.baseUrl + "/application/mobileForm4", {
        sponsor: app.sponsor,
        sponsorName: app.sponsorName,
        budget: app.budget,
        sponsorOccupation: app.sponsorOccupation,
        userId: app.userId,
        id: app.applicationId
      })
      .pipe(
        tap(results => {
          let app = results["app"];

          if (app) this.storage.set(APP_KEY, app);
          return results;
        }),
        catchError(e => {
          //console.log(e.error.msg);
          throw new Error(e);
        })
      );
  }
  form5(app: Application): Observable<any> {
    return this.http
      .post(this.baseUrl + "/application/mobileForm5", {
        courseId: app.courseId,
        moreInfo: app.moreInfo,
        purpose: app.purpose,
        hasApplied: app.hasApplied,
        reasonOfRefusal: app.reasonOfRefusal,
        userId: app.userId,
        id: app.applicationId
      })
      .pipe(
        tap(results => {
          let app = results["app"];
          if (app) this.storage.set(APP_KEY, app);
          return results;
        }),
        catchError(e => {
          //console.log(e.error.msg);
          throw new Error(e);
        })
      );
  }
  final(app: Application): Observable<any> {
    return this.http
      .post(this.baseUrl + "/application/mobileSubmission", {
        userId: app.userId,
        id: app.applicationId
      })
      .pipe(
        tap(results => {
          let app = results["app"];
          if (app) this.storage.set(APP_KEY, app);
          return results;
        }),
        catchError(e => {
          //console.log(e.error.msg);
          throw new Error(e);
        })
      );
  }
  register(username, email, password): Observable<any> {
    return this.http
      .post(this.baseUrl + "/user/mobileRegister", {
        username: username,
        password: password,
        email: email
      })
      .pipe(
        tap((results: any) => {
          if (results.success) {
            this.storage.remove(APP_KEY);
            this.storage.set(TOKEN_KEY, results["token"]);
            this.user = this.helper.decodeToken(results["token"]);
            this.storage.set(USER_KEY, results["user"]);
            this.authenticationState.next(true);
          }

          return results;
        }),
        catchError(e => {
          //console.log(e.error.msg);
          throw new Error(e);
        })
      );
  }
  getCourses(facultyId, schoolId): Observable<any> {
    return this.http
      .post(this.baseUrl + "/getCoursesByFaculty", {
        facultyId: facultyId,
        schoolId: schoolId
      })
      .pipe(
        tap((results: any) => {
          return results;
        }),
        catchError(e => {
          //console.log(e.error.msg);
          throw new Error(e);
        })
      );
  }
  logout() {
    this.storage.remove(USER_KEY).then(() => {
      this.storage.remove(TOKEN_KEY).then(() => {
        this.authenticationState.next(false);
        this.navCtrl.navigateRoot("/main/landing");
      });
    });
  }
  getSchools(): Observable<any> {
    return this.http.get(this.baseUrl + "/schoolsMobile").pipe(
      map(results => {
        console.log(results["data"]);
        this.storage.set(SCHOOL_KEY, results["data"]);

        return results["data"];
      })
    );
  }

  formOne(userId): Observable<any> {
    return this.http
      .post(this.baseUrl + "/application/mobileStep1", { userId: userId })
      .pipe(
        map(results => {
          this.storage.set(STATIC_DATA_KEY, results);
          return results;
        })
      );
  }
  changePassword(oldPass, newPass, username): Observable<any> {
    return this.http
      .post(this.baseUrl + "/user/mobileChangePassword", {
        username: username,
        oldPassword: oldPass,
        newPassword: newPass
      })
      .pipe(
        map(results => {
          return results;
        })
      );
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
