import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MenuPage } from "./menu.page";

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: "university",
        loadChildren: "../university/university.module#UniversityPageModule"
      },
      {
        path: "course-detail/:courseObj",
        loadChildren:
          "../course-detail/course-detail.module#CourseDetailPageModule"
      },
      {
        path: "dashboard",
        loadChildren: "../dashboard/dashboard.module#DashboardPageModule"
      },
      {
        path: "dashboard_update",
        loadChildren: "../dashboard_update/dashboard_update.module#DashboardUpdatePageModule"
      },
      {
        path: "course/:facultyId/:schoolId",
        loadChildren: "../course/course.module#CoursePageModule"
      },
      {
        path: "form",
        loadChildren: "../first-form/first-form.module#FirstFormPageModule"
      },
      {
        path: "secondForm",
        loadChildren: "../second-form/second-form.module#SecondFormPageModule"
      },
      {
        path: "thirdForm",
        loadChildren: "../third-form/third-form.module#ThirdFormPageModule"
      },
      {
        path: "forthForm",
        loadChildren: "../forth-form/forth-form.module#ForthFormPageModule"
      },
      {
        path: "fifthForm",
        loadChildren: "../fifth-form/fifth-form.module#FifthFormPageModule"
      },
      {
        path: "finalForm",
        loadChildren: "../final/final.module#FinalPageModule"
      },
      {
        path: "uploadForm",
        loadChildren: "../upload/upload.module#UploadPageModule"
      },
      {
        path: "setting",
        loadChildren: "../setting/setting.module#SettingPageModule"
      },
      {
        path: "password",
        loadChildren: "../password/password.module#PasswordPageModule"
      },
      {
        path: "messages",
        loadChildren: "../messages/messages.module#MessagesPageModule"
      },
      {
        path: "compose",
        loadChildren: "../compose/compose.module#ComposePageModule"
      },
      {
        path: "message-sent",
        loadChildren:
          "../message-sent/message-sent.module#MessageSentPageModule"
      },
      {
        path: "message-create",
        loadChildren:
          "../message-create/message-create.module#MessageCreatePageModule"
      },
      {
        path: "message-read/:msgObj",
        loadChildren:
          "../message-read/message-read.module#MessageReadPageModule"
      },
      { path: "photo", loadChildren: "../photo/photo.module#PhotoPageModule" },
      {
        path: "checklist",
        loadChildren: "../checklist/checklist.module#ChecklistPageModule"
      },
      { path: "help", loadChildren: "../help/help.module#HelpPageModule" },
      {
        path: "viewApplication",
        loadChildren:
          "../application-view/application-view.module#ApplicationViewPageModule"
      },
      {
        path: "coursenew",
        loadChildren: "../coursenew/coursenew.module#CoursenewPageModule"
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
