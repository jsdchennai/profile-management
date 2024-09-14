import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Degree, ProgressPercentage } from '../../../models';
import { Institution } from '../../../models/institution';
import { ProfileProgressService } from '../../../shared/services';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
})
export class EducationFormComponent implements OnInit {
  @Input()
  public educationDetailsForm: FormGroup;

  @Input()
  public degrees: Degree[];

  @Input()
  public institutions: Institution[];

  private formBuilder = inject(FormBuilder);

  private profileProgressService = inject(ProfileProgressService);

  get educationDetailsArray() {
    return this.educationDetailsForm.get('educationDetailsArray') as FormArray;
  }

  addEducationDetails(): void {
    const educationDetails = this.formBuilder.group({
      degree: ['', Validators.required],
      institution: ['', Validators.required],
    });

    this.educationDetailsArray.push(educationDetails);
  }

  checkError(index: number, control: string, error: string) {
    return this.educationDetailsArray.at(index).get(control).hasError(error);
  }

  removeEducationDetails(index: number): void {
    this.educationDetailsArray.removeAt(index);
  }

  onSubmitProgressValue() {
    let progressValue =
      ProgressPercentage.educationDetailsPercentage +
      this.profileProgressService.progressValue$.value;
    this.profileProgressService.setProgressValue(progressValue);
  }

  ngOnInit(): void {
    this.addEducationDetails();
  }
}
