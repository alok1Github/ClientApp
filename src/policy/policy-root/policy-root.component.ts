import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { concatMap, map } from 'rxjs/operators';
import { PolicyAddUpdateComponent } from '../policy-add-update/policy-add-update.component';
import { Gender, Policy } from '../policy.model';
import { PolicyService } from '../policy.service';


@Component({
  templateUrl: './policy-root.component.html',
  styleUrls: ['./policy-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyComponent {
  displayedColumns: string[] = ['name', 'age', 'gender', 'policyNumber', 'edit', 'delete'];
  genders = [{ name: "Male", value: Gender.Male }, { name: "Female", value: Gender.Female }];

  dataSource: any;
  PolicyUpdateComponent: MatDialogRef<PolicyAddUpdateComponent>;

  policies$ = this.getAllPolicies();

  constructor(private service: PolicyService, public dialog: MatDialog) { }


  edit(data: Policy): void {
    this.PolicyUpdateComponent = this.dialog.open(PolicyAddUpdateComponent, {
      width: '1000px',
      data: data
    });

    this.policies$ = this.PolicyUpdateComponent.afterClosed().pipe(
      concatMap(_ => this.getAllPolicies())
    );
  }

  delete(policyNumber: number): void {
    this.policies$ = this.service.deletePolicy(policyNumber).pipe(
      concatMap(_ => this.getAllPolicies())
    );
  }

  private getAllPolicies() {
    return this.service.policies$.pipe(map(data => this.setGender(data)));
  }

  private setGender(data: Policy[]) {
    data.map(p => {
      p.policyHolder.gender = this.genders[p.policyHolder?.gender].value;
      p.policyHolder.genderName = Gender[p.policyHolder?.gender];
    });
    return data;
  }
}


