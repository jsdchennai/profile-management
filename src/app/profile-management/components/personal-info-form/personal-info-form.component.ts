import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProfileProgressService } from '../../../shared/services';
import { ProgressPercentage } from '../../../models';

@Component({
  selector: 'app-personal-info-form',
  templateUrl: './personal-info-form.component.html',
  styleUrl: './personal-info-form.component.scss',
})
export class PersonalInfoFormComponent {
  @Input()
  public basicDetailsForm: FormGroup;

  private profileProgressService = inject(ProfileProgressService);

  onSubmitProgressValue() {
    let progressValue =
      ProgressPercentage.basicDetailsPercentage +
      this.profileProgressService.progressValue$.value;
    this.profileProgressService.setProgressValue(progressValue);
  }
}
