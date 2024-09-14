import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileManagementService } from '../../../core/services';
import { Company, Degree, Skill } from '../../../models';
import { Institution } from '../../../models/institution';
import { debounce, debounceTime } from 'rxjs';
import { ProfileProgressService } from '../../../shared/services';

enum FormStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
}

@Component({
  selector: 'app-profile-management-page',
  templateUrl: './profile-management-page.component.html',
  styleUrl: './profile-management-page.component.scss',
})
export class ProfileManagementPageComponent implements OnInit {
  public isLinear: boolean = true;

  public degrees: Degree[] = [];

  public institutions: Institution[] = [];

  public skills: Skill[] = [];

  public companies: Company[] = [];

  profileManagementForm: FormGroup;

  private formBuilder = inject(FormBuilder);

  private profileProgressService = inject(ProfileProgressService);

  private profileManagementService = inject(ProfileManagementService);

  get basicDetailsForm() {
    return this.profileManagementForm.get('basicDetailsForm') as FormGroup;
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

  getInstitutions() {
    this.profileManagementService.getInstitutions().subscribe({
      next: (res: Institution[]) => {
        this.institutions = res;
      },
      error: () => {},
    });
  }

  getCompanies() {
    this.profileManagementService.getCompanies().subscribe({
      next: (res: Institution[]) => {
        this.companies = res;
      },
      error: () => {},
    });
  }

  getSkills() {
    this.profileManagementService.getSkills().subscribe({
      next: (res: Skill[]) => {
        this.skills = res;
      },
      error: () => {},
    });
  }

  initForm() {
    this.profileManagementForm = this.formBuilder.group({
      basicDetailsForm: this.formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
      }),
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
  }

  updateProgressValue(value: number) {
    let progressValue =
      value + this.profileProgressService.progressValue$.value;
    this.profileProgressService.setProgressValue(progressValue);
  }

  listenForStatusChanges() {
    this.basicDetailsForm.statusChanges
      .pipe(debounceTime(1000))
      .subscribe((status) => {
        if (status == FormStatus.VALID) {
          this.profileProgressService.setProgressValue(30);
        }
      });

    this.educationDetailsForm.statusChanges
      .pipe(debounceTime(1000))
      .subscribe((status) => {
        if (status == FormStatus.VALID) {
          let value = this.profileProgressService.progressValue$.value + 25;
          this.profileProgressService.setProgressValue(value);
        }

        // if (status == FormStatus.INVALID) {
        //   this.profileProgressService.setProgressValue(-25);
        // }
      });

    this.workHistoryForm.statusChanges
      .pipe(debounceTime(1000))
      .subscribe((status) => {
        if (status == FormStatus.VALID) {
          this.profileProgressService.setProgressValue(25);
        }

        // if (status == FormStatus.INVALID) {
        //   this.profileProgressService.setProgressValue(-25);
        // }
      });

    this.skillsForm.statusChanges
      .pipe(debounceTime(1000))
      .subscribe((status) => {
        if (status == FormStatus.VALID) {
          this.profileProgressService.setProgressValue(20);
        }

        // if (status == FormStatus.INVALID) {
        //   this.profileProgressService.setProgressValue(-20);
        // }
      });
  }

  ngOnInit(): void {
    this.initForm();
    this.getDegrees();
    this.getInstitutions();
    this.getCompanies();
    this.getSkills();

    // setInterval(() => {
    //   console.log(
    //     this.profileManagementForm.value,
    //     this.profileManagementForm.valid
    //   );
    // }, 5000);
  }
}
