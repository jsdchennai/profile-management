import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile-management-page',
  templateUrl: './profile-management-page.component.html',
  styleUrl: './profile-management-page.component.scss',
})
export class ProfileManagementPageComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  isLinear = false;

  profileManagementForm;

  get basicDetailsForm() {
    return this.profileManagementForm.get('basicDetialsForm');
  }

  get educationDetailsForm() {
    return this.profileManagementForm.get('educationDetailsForm');
  }

  get workHistoryFormGroup() {
    return this.profileManagementForm.get('workHistoryFormGroup');
  }

  get skillsForm() {
    return this.profileManagementForm.controls.skillsForm as FormGroup;
  }

  ngOnInit(): void {
    this.profileManagementForm = this.formBuilder.group({
      basicDetailsForm: this.formBuilder.group({}),
      educationDetailsForm: this.formBuilder.group({}),
      workHistoryFormGroup: this.formBuilder.group({
        workHistoryFormArray: this.formBuilder.array([]),
      }),
      skillsForm: this.formBuilder.group({
        skill: new FormControl(''),
      }),
    });

    // setInterval(() => {
    //   console.log(this.profileManagementForm.value);
    // }, 5000);
  }
}
