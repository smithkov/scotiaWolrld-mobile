import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MainPage } from "./main.page";

const routes: Routes = [
  {
    path: "main",
    component: MainPage,
    children: [
      { path: "login", loadChildren: "../login/login.module#LoginPageModule" },
      {
        path: "register",
        loadChildren: "../register/register.module#RegisterPageModule"
      }
    ]
  },
  { path: "", redirectTo: "main/login" }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
