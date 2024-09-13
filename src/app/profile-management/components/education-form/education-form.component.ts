import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Degree } from '../../../models';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
})
export class EducationFormComponent implements OnInit {
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  @Input()
  public educationDetailsForm: FormGroup;

  @Input()
  public degrees: Degree[];

  constructor(private formBuilder: FormBuilder) {}

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

  checkError(index: number, control: string, error: string): boolean {
    return this.educationDetailsArray.at(index).get(control).hasError(error);
  }

  getControl(index: number, control: string) {
    return this.educationDetailsArray.at(index).get(control) as FormControl;
  }

  removeEducationDetails(index: number): void {
    this.educationDetailsArray.removeAt(index);
  }

  private _filter(value) {
    const filterValue = value.a.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private filter(value) {
    return ['one'];
  }

  valueChanges() {
    this.educationDetailsArray.controls.forEach((formGroup: FormGroup) => {
      console.log('control', formGroup);

      let degreeControl = formGroup.get('degree');

      this.filteredOptions = degreeControl.valueChanges.pipe(
        map((value) => this.filter(value || ''))
      );
    });
  }

  ngOnInit(): void {
    this.addEducationDetails();
    this.valueChanges();
  }
}
