import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from './components/alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
const SHARED_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatStepperModule,
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatIconModule,
  MatAutocompleteModule,
];

@NgModule({
  declarations: [AlertComponent, ConfirmationDialogComponent],
  imports: [...SHARED_MODULES],
  exports: [...SHARED_MODULES],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
