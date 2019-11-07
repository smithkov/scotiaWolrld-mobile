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
export class MenuPageModule {}
