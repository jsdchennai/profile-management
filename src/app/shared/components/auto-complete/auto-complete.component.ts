import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormControlDirective,
  FormGroup,
  FormGroupDirective,
  UntypedFormControl,
} from '@angular/forms';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
  providers: [],
})
export class AutoCompleteComponent {
  filteredOptions: any[] = [];

  @Input()
  public showRequiredValidatorError: boolean;

  @Input()
  public label: string;

  @Input()
  public key: string;

  @Input()
  public placeHolder: string;

  @Input()
  public options: any[] = [];

  @Input()
  public formgroup: any;

  @Input()
  public formcontrolName: string;

  @Input()
  public validators: string[] = [];

  checkError(validator: string) {
    return this.formgroup.get(this.formcontrolName).hasError(validator);
  }

  onInput(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredOptions = this.options.filter((option) =>
      option[this.key].toLowerCase().includes(filterValue)
    );
  }
}
