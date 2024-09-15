import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgressPercentage, Skill } from '../../../models';
import { ProfileProgressService } from '../../../shared/services';

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss',
})
export class SkillsFormComponent implements OnInit {
  @Input()
  public skills: Skill[];

  @Input()
  public skillsForm: FormGroup;

  @Output()
  public submitted = new EventEmitter();

  private profileProgressService = inject(ProfileProgressService);

  private formBuilder = inject(FormBuilder);

  onSubmitProgressValue() {
    let progressValue =
      ProgressPercentage.skillsPercentage +
      this.profileProgressService.progressValue$.value;

    this.profileProgressService.setProgressValue(progressValue);
  }

  get skillsArray() {
    return this.skillsForm.get('skillsArray') as FormArray;
  }

  addSkills() {
    const skillForm = this.formBuilder.group({
      skill: ['', Validators.required],
    });
    this.skillsArray.push(skillForm);
  }

  onSubmit() {
    this.submitted.emit();
  }

  ngOnInit(): void {
    this.addSkills();
  }
}
