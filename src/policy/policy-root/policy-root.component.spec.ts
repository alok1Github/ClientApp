import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { AngularMaterialModule } from "src/shared/angular-material.module";
import { Gender, Policy } from "../policy.model";
import { PolicyService } from "../policy.service";
import { PolicyComponent } from "./policy-root.component";

describe("PolicyComponent", () => {
  let fixture: ComponentFixture<PolicyComponent>;
  let component: PolicyComponent;

  const policies = [{
    "policyNumber": 739562, "policyHolder"
      : { "name": "Dwayne Johnson", "age": 44, "gender": 0 }
  }, { "policyNumber": 355679, "policyHolder": { "name": "Trish Stratus", "age": 42, "gender": 1 } }];


  const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), close: null });


  const mockService = {
    policies$: of(policies),
    deletePolicy(policyNumber: number): Observable<void> {
      return;
    },
    onGetPolicyData(policy: Policy): void {
      return;
    },
  };

  beforeEach((() => {

    TestBed.configureTestingModule({
      declarations: [PolicyComponent],
      imports: [MatDialogModule, AngularMaterialModule],
      providers: [{ provide: PolicyService, useValue: mockService }, MatDialog],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();

  }));

  it("should create the component", (() => {
    expect(component).toBeTruthy();
  }));

  describe("Get policies", () => {
    it("should set the gender to correct value for all the policies", (() => {
      component.policies$.subscribe(data => {
        expect(data[0].policyHolder.gender).toBe(Gender.Male);
        expect(data[1].policyHolder.gender).toBe(Gender.Female);
      });
    }));
  });

  describe("Update policy", () => {
    it("should call the open modal method for update the policy and afterClosed post update", (() => {
      const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

      component.edit(new Policy());

      expect(dialogSpy).toHaveBeenCalled();
      expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();

    }));
  });

  describe("Delete Policy", () => {

    it("should call deletePolicy method of service for deleting policy", (() => {
      const serviceSpy = TestBed.inject(PolicyService);

      spyOn(serviceSpy, 'deletePolicy').and.returnValues(of());
      spyOn(serviceSpy, "policies$" as any).and.returnValue(of([]));

      component.delete(1234);

      expect(serviceSpy.deletePolicy).toHaveBeenCalledTimes(1);

    }));

    it("should call policies method of service for after deleteing policy", (() => {
      const serviceSpy = TestBed.inject(PolicyService);

      spyOn(serviceSpy, 'deletePolicy').and.returnValues(of());
      spyOn(serviceSpy, "policies$" as any).and.returnValue(of([]));

      component.delete(1234);

      expect(serviceSpy.policies$).toHaveBeenCalledTimes(1);
    }));

  });
});
