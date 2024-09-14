import { Component, inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company, ProgressPercentage } from '../../../models';
import { ProfileProgressService } from '../../../shared/services';

@Component({
  selector: 'app-work-history-form',
  templateUrl: './work-history-form.component.html',
  styleUrl: './work-history-form.component.scss',
})
export class WorkHistoryFormComponent implements OnInit {
  @Input()
  public workHistoryForm: FormGroup;

  @Input()
  public companies: Company[];

  private profileProgressService = inject(ProfileProgressService);

  private formBuilder = inject(FormBuilder);

  onSubmitProgressValue() {
    let progressValue =
      ProgressPercentage.workHistoryPercentage +
      this.profileProgressService.progressValue$.value;

    this.profileProgressService.setProgressValue(progressValue);
  }

  get workHistoryArray() {
    return this.workHistoryForm.get('workHistoryArray') as FormArray;
  }

  addWorkHistory() {
    const workHistory = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.workHistoryArray.push(workHistory);
  }

  checkError(index: number, control: string, error: string) {
    return this.workHistoryArray.at(index).get(control).hasError(error);
  }

  removeEducationDetails(index: number): void {
    this.workHistoryArray.removeAt(index);
  }

  ngOnInit(): void {
    this.addWorkHistory();
  }
}
