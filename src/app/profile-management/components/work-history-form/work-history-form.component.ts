import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../../models';

@Component({
  selector: 'app-work-history-form',
  templateUrl: './work-history-form.component.html',
  styleUrl: './work-history-form.component.scss',
})
export class WorkHistoryFormComponent implements OnInit {
  public filteredCompanies: Company[] = [];

  @Input()
  public workHistoryForm: FormGroup;

  @Input()
  public companies: Company[];

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

  checkError(index: number, control: string, error: string) {
    return this.workHistoryArray.at(index).get(control).hasError(error);
  }

  removeEducationDetails(index: number): void {
    this.workHistoryArray.removeAt(index);
  }

  onInputCompany(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredCompanies = this.companies.filter((company) =>
      company.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.addWorkHistory();
  }
}
