import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
})
export class EducationFormComponent implements OnInit {
  @Input() educationDetailsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formGroupDirective: FormGroupDirective
  ) {}

  get educationDetailsArray() {
    return this.educationDetailsForm.get('educationDetailsArray') as FormArray;
  }

  addEducationDetails() {
    const educationDetails = this.formBuilder.group({
      degree: [''],
      institution: [''],
    });

    this.educationDetailsArray.push(educationDetails);
  }

  ngOnInit(): void {
    // this.educationDetailsForm = this.formGroupDirective.control[
    //   'educationDetailsForm'
    // ] as FormGroup;

    setTimeout(() => {
      console.log(this.formGroupDirective.control);
    }, 2000);

    this.addEducationDetails();
  }
}
