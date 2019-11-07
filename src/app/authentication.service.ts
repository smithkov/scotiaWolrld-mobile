import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Platform, AlertController } from "@ionic/angular";
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
const DATA_KEY = "data_key";

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
    private router: Router
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
  getData() {
    return this.storage.get(DATA_KEY).then(data => {
      return data;
    });
  }
  saveData(data) {
    this.storage.set(DATA_KEY, data);
  }
  login(username, password): Observable<any> {
    return this.http
      .post(this.baseUrl + "/user/mobileLogin", {
        username: username,
        password: password
      })
      .pipe(
        tap(results => {
          this.storage.set(TOKEN_KEY, results["token"]);
          this.storage.set(USER_KEY, results["user"]);
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
        gender: app.gender
      })
      .pipe(
        tap(results => {
          console.log(results);
          return results;
        }),
        catchError(e => {
          console.log(e.error.msg);
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
          console.log(results);
          return results;
        }),
        catchError(e => {
          console.log(e.error.msg);
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
        highSchoolName: app.highSchoolName,
        englishTest: app.englishTest
      })
      .pipe(
        tap(results => {
          console.log(results);
          return results;
        }),
        catchError(e => {
          console.log(e.error.msg);
          throw new Error(e);
        })
      );
  }
  form5(app: Application): Observable<any> {
    return this.http
      .post(this.baseUrl + "/application/mobileForm5", {
        moreInfo: app.moreInfo,
        purpose: app.purpose,
        hasApplied: app.hasApplied,
        reasonOfRefusal: app.reasonOfRefusal,
        userId: app.userId,
        id: app.applicationId
      })
      .pipe(
        tap(results => {
          console.log(results);
          return results;
        }),
        catchError(e => {
          console.log(e.error.msg);
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
            this.storage.set(TOKEN_KEY, results["token"]);
            this.user = this.helper.decodeToken(results["token"]);
            this.authenticationState.next(true);
          }

          return results;
        }),
        catchError(e => {
          console.log(e.error.msg);
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
          console.log(e.error.msg);
          throw new Error(e);
        })
      );
  }
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      this.router.navigate(["/login"]);
    });
  }
  getSchools(): Observable<any> {
    return this.http.get(this.baseUrl + "/schoolsMobile").pipe(
      map(results => {
        return results["data"];
      })
    );
  }

  formOne(userId): Observable<any> {
    return this.http
      .post(this.baseUrl + "/application/mobileStep1", { userId: userId })
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
