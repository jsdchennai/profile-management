import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrl: './personal-info-form.component.scss',
})
export class PersonalInfoFormComponent {
  @Input()
  public basicDetailsForm: FormGroup;

  private formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.basicDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
}
