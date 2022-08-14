export enum Gender {
  Male,
  Female
}

export class PolicyHolder {
  name: string;
  age: number;
  gender: Gender;
  genderName: string;
}

export class Policy {
  constructor() {
    this.policyHolder = new PolicyHolder();
  }
  policyNumber: number;
  policyHolder: PolicyHolder;
  selectedGender: Gender;
  isAddMode = true;
}
