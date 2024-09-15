import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileManagementService } from '../../../core/services';
import { Company, Degree, Skill } from '../../../models';
import { Institution } from '../../../models/institution';
import { debounceTime } from 'rxjs';
import { ProfileProgressService } from '../../../shared/services';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
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
  public isLinear: boolean = false;

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

  generatePdf(action = 'open') {
    const documentDefinition: any = this.getDocumentDefinition();

    switch (action) {
      case 'open':
        pdfMake.createPdf(documentDefinition).open();
        break;
      case 'print':
        pdfMake.createPdf(documentDefinition).print();
        break;
      case 'download':
        pdfMake.createPdf(documentDefinition).download();
        break;

      default:
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getDocumentDefinitionOld() {
    return {
      content: [
        {
          text: 'RESUME',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            [
              {
                text: 'deepak',
                style: 'name',
              },
              {
                text: 'address',
              },
              {
                text: 'Email : ' + 'jsdchennai@gmail.com',
              },
              {
                text: 'Contant No : ' + '7358685843',
              },
            ],
          ],
        },
        {
          text: 'Skills',
          style: 'header',
        },
        {
          columns: [
            {
              ul: ['skill 1'],
            },
            {
              ul: ['skill 2'],
            },
            {
              ul: ['skill 3'],
            },
          ],
        },
      ],
      info: {
        title: 'deepak' + '_RESUME',
        author: 'deepak',
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline',
        },
        name: {
          fontSize: 16,
          bold: true,
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true,
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true,
        },
        tableHeader: {
          bold: true,
        },
      },
    };
  }

  getDocumentDefinition() {
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
          columns: this.getSkillDetils(),
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
        },
        name: {
          fontSize: 16,
          bold: true,
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true,
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true,
        },
        tableHeader: {
          bold: true,
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
          text: `${workHistory.jobTitle}, ${workHistory.company}, ${workHistory.startDate}, ${workHistory.endDate}`,
        };

        workHistoryArray.push(obj);
      });

    return workHistoryArray;
  }

  getSkillDetils() {
    let skillsArray = [];
    this.skillsForm.get('skillsArray').value.forEach((skill) => {
      let obj = { ul: [skill.value] };
      skillsArray.push(obj);
    });

    console.log(skillsArray);

    return skillsArray;
  }

  ngOnInit(): void {
    this.initForm();
    this.getDegrees();
    this.getInstitutions();
    this.getCompanies();
    this.getSkills();
  }
}
