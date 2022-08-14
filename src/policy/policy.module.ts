import { NgModule } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/shared/shared.module";
import { PolicyAddUpdateComponent } from "./policy-add-update/policy-add-update.component";
import { PolicyTabComponent } from "./policy-navigation/policy-tab.componet";
import { PolicyComponent } from "./policy-root/policy-root.component";

const routes: Routes = [
  { path: 'existing-policy', component: PolicyComponent },
  { path: 'add-update-policy', component: PolicyAddUpdateComponent },

];
@NgModule({
  declarations: [PolicyComponent, PolicyAddUpdateComponent, PolicyTabComponent],
  imports: [SharedModule, RouterModule.forRoot(routes)],
  exports: [PolicyComponent, PolicyAddUpdateComponent, PolicyTabComponent],
  providers: [{ provide: MatDialogRef, useValue: {} },

  { provide: MAT_DIALOG_DATA, useValue: {} }]
})
export class PolicyModule { }
