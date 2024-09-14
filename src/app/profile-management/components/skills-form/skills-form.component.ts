import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from '../../../models';

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

  constructor(private formBuilder: FormBuilder) {}

  get skillsArray() {
    return this.skillsForm.get('skillsArray') as FormArray;
  }

  addSkills() {
    const skillForm = this.formBuilder.group({
      skill: ['', Validators.required],
    });
    this.skillsArray.push(skillForm);
  }

  ngOnInit(): void {
    this.addSkills();
  }
}
