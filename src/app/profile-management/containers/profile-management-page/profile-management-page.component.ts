import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileManagementService } from '../../../core/services';
import { Company, Degree, Skill } from '../../../models';
import { Institution } from '../../../models/institution';
import { debounceTime } from 'rxjs';
import { ProfileProgressService } from '../../../shared/services';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  public showDownloadBtn: boolean = false;

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
      });

    this.workHistoryForm.statusChanges
      .pipe(debounceTime(1000))
      .subscribe((status) => {
        if (status == FormStatus.VALID) {
          this.profileProgressService.setProgressValue(25);
        }
      });

    this.skillsForm.statusChanges
      .pipe(debounceTime(1000))
      .subscribe((status) => {
        if (status == FormStatus.VALID) {
          this.profileProgressService.setProgressValue(20);
        }
      });
  }

  generatePdf() {
    const documentDefinition: any = this.getDocDefinition();
    pdfMake.createPdf(documentDefinition).download();
  }

  getDocDefinition() {
    return {
      content: [
        {
          text: 'Profile',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          text: 'Basic Details',
          style: 'header',
        },
        {
          columns: [this.getBasicDetails()],
        },
        {
          text: 'Education',
          style: 'header',
        },
        {
          columns: [this.getEducationDetails()],
        },
        {
          text: 'Experience',
          style: 'header',
        },
        {
          columns: [this.getWorkHistory()],
        },
        {
          text: 'Skills',
          style: 'header',
        },
        {
          columns: [this.getSkillDetils()],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
        },
      },
    };
  }

  getBasicDetails() {
    let basicDetails = [
      {
        text: this.basicDetailsForm.get('name').value,
      },
      {
        text: this.basicDetailsForm.get('address').value,
      },
      {
        text: localStorage.getItem('email'),
      },
      {
        text: this.basicDetailsForm.get('phone').value,
      },
    ];

    return basicDetails;
  }

  getEducationDetails() {
    let educationDetailsArray = [];
    this.educationDetailsForm
      .get('educationDetailsArray')
      .value.forEach((educationDetail) => {
        let obj = {
          text: `${educationDetail.degree}, ${educationDetail.institution}`,
        };

        educationDetailsArray.push(obj);
      });

    return educationDetailsArray;
  }

  getWorkHistory() {
    let workHistoryArray = [];
    this.workHistoryForm
      .get('workHistoryArray')
      .value.forEach((workHistory) => {
        let obj = {
          text: `${workHistory.jobTitle}, ${
            workHistory.company
          }, ${this.formatDate(workHistory.startDate)} - ${this.formatDate(
            workHistory.endDate
          )}`,
        };

        workHistoryArray.push(obj);
      });

    return workHistoryArray;
  }

  getSkillDetils() {
    let skillsArray = [];
    this.skillsForm.get('skillsArray').value.forEach((skill) => {
      let obj = { ul: [skill.skill] };
      skillsArray.push(obj);
    });

    return skillsArray;
  }

  formatDate(date: Date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  submit() {
    this.showDownloadBtn = true;
    this.profileManagementForm.disable();
  }

  ngOnInit(): void {
    this.initForm();
    this.getDegrees();
    this.getInstitutions();
    this.getCompanies();
    this.getSkills();
  }
}
