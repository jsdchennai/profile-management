import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
  });

  @Output() submitted = new EventEmitter();

  @ViewChild('form') form: NgForm;

  get nameControl() {
    return this.signUpForm.get('name');
  }

  get emailControl() {
    return this.signUpForm.get('email');
  }

  get passwordControl() {
    return this.signUpForm.get('password');
  }

  resetForm() {
    this.form.resetForm();
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    this.submitted.emit(this.signUpForm.value);
  }
}
