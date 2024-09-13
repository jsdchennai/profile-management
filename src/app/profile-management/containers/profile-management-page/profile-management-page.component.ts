import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileManagementService } from '../../../core/services';
import { Degree } from '../../../models';

@Component({
  selector: 'app-profile-management-page',
  templateUrl: './profile-management-page.component.html',
  styleUrl: './profile-management-page.component.scss',
})
export class ProfileManagementPageComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  private profileManagementService = inject(ProfileManagementService);

  public isLinear = false;

  public degrees: Degree[] = [];

  profileManagementForm: FormGroup;

  get basicDetailsForm() {
    return this.profileManagementForm.get('basicDetialsForm') as FormGroup;
  }

  get educationDetailsForm() {
    return this.profileManagementForm.get('educationDetailsForm') as FormGroup;
  }

  get workHistoryForm() {
    return this.profileManagementForm.get('workHistoryForm') as FormGroup;
  }

  get skillsForm() {
    return this.profileManagementForm.get('skillsForm') as FormGroup;
  }

  getDegrees() {
    this.profileManagementService.getDegrees().subscribe({
      next: (res: Degree[]) => {
        this.degrees = res;
      },
      error: () => {},
    });
  }

  ngOnInit(): void {
    this.profileManagementForm = this.formBuilder.group({
      basicDetailsForm: this.formBuilder.group({}),
      educationDetailsForm: this.formBuilder.group({
        educationDetailsArray: this.formBuilder.array([]),
      }),
      workHistoryForm: this.formBuilder.group({
        workHistoryArray: this.formBuilder.array([]),
      }),
      skillsForm: this.formBuilder.group({
        skillsArray: this.formBuilder.array([]),
      }),
    });

    this.getDegrees();
  }
}
