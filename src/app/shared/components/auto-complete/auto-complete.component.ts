import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
  encapsulation: ViewEncapsulation.None,
  providers: [],
})
export class AutoCompleteComponent {
  filteredOptions: any[] = [];

  @Input()
  public width: string;

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

  @Input()
  public showRequiredValidatorError: boolean;

  @Input()
  public showRequiredErrorMessage: boolean;

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
