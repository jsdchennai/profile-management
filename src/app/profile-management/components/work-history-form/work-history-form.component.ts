import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-work-history-form',
  templateUrl: './work-history-form.component.html',
  styleUrl: './work-history-form.component.scss',
})
export class WorkHistoryFormComponent implements OnInit {
  @Input() workHistoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  get workHistoryArray() {
    return this.workHistoryForm.get('workHistoryArray') as FormArray;
  }

  addWorkHistory() {
    const workHistory = this.formBuilder.group({
      jobTitle: [''],
      company: [''],
      startDate: [''],
      endDate: [''],
    });

    this.workHistoryArray.push(workHistory);
  }

  ngOnInit(): void {
    this.addWorkHistory();
  }
}
