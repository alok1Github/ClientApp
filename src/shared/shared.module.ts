import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialModule } from "./angular-material.module";

@NgModule({
  exports: [AngularMaterialModule, HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule]

})
export class SharedModule { }
