import { ChangeDetectionStrategy, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Gender, Policy } from "../policy.model";
import { PolicyService } from "../policy.service";

@Component({
  templateUrl: './policy-add-update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyAddUpdateComponent implements OnInit {
  policyForm: FormGroup;
  request: Policy;
  policyData$: Observable<Policy>;
  genders = [{ name: "Male", value: Gender.Male }, { name: "Female", value: Gender.Female }];


  constructor
    (private service: PolicyService,
      private fromBuilder: FormBuilder,
      public dialogRef: MatDialogRef<PolicyAddUpdateComponent>,
      @Inject(MAT_DIALOG_DATA) public dialogData: Policy,
      private router: Router) {

    this.service.onGetPolicyData(this.dialogData);
  }

  ngOnInit(): void {

    this.policyData$ = this.service.policyData$.pipe(
      map(policy => {
        this.policyForm = this.fromBuilder.group({
          policyNumber: [policy.policyNumber, Validators.required],
          policyHolder: this.fromBuilder.group({
            name: [policy.policyHolder?.name, Validators.required],
            age: [policy.policyHolder?.age, Validators.required],
            gender: [policy.policyHolder?.gender, Validators.required]
          })
        });
        policy.selectedGender = this.genders[policy.policyHolder?.gender]?.value;

        return policy;
      })
    );

  }

  addPolicy(): void {
    if (this.policyForm.valid && this.policyForm.dirty) {
      this.request = { ...this.request, ...this.policyForm.value };

      this.service.addPolicy(this.request).subscribe(_ => this.router.navigate(['/existing-policy']));

    }
  }

  updatePolicy(policyData: Policy): void {
    if (this.policyForm.valid && this.policyForm.dirty) {
      policyData = { ...policyData, ...this.policyForm.value };

      this.service.updatePolicy(policyData).subscribe(_ => this.dialogRef.close());

    }
  }

  validateMessage(control: string): string {
    if (this.policyForm.get(control).hasError('required')) {
      return `You must enter a ${control}`;
    }
    return "";
  }

}
