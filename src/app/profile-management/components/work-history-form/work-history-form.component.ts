import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-history-form',
  templateUrl: './work-history-form.component.html',
  styleUrl: './work-history-form.component.scss',
})
export class WorkHistoryFormComponent implements OnInit {
  @Input()
  public workHistoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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

  ngOnInit(): void {
    this.addWorkHistory();
  }
}
