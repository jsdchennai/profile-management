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
import { Institution } from '../../../models/institution';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
})
export class EducationFormComponent implements OnInit {
  filteredDegrees: Degree[] = [];

  filteredInstitutions: Institution[] = [];

  @Input()
  public educationDetailsForm: FormGroup;

  @Input()
  public degrees: Degree[];

  @Input()
  public institutions: Institution[];

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

  getControl(index: number, control: string) {
    return this.educationDetailsArray.at(index).get(control) as FormControl;
  }

  checkError(index: number, control: string, error: string) {
    return this.educationDetailsArray.at(index).get(control).hasError(error);
  }

  removeEducationDetails(index: number): void {
    this.educationDetailsArray.removeAt(index);
  }

  onInputDegree(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredDegrees = this.degrees.filter((degree) =>
      degree.acronym.toLowerCase().includes(filterValue)
    );
  }

  onInputInstituion(value: string) {
    console.log(value);
    const filterValue = value.toLowerCase();
    this.filteredInstitutions = this.institutions.filter((institution) =>
      institution.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.addEducationDetails();
  }
}
