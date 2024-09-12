import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss',
})
export class SkillsFormComponent implements OnInit {
  @Input() skillsForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  get skillsArray() {
    return this.skillsForm.get('skillsArray') as FormArray;
  }

  addSkills() {
    const skillForm = this.formBuilder.group({
      skill: [''],
    });
    this.skillsArray.push(skillForm);
  }

  ngOnInit(): void {
    this.addSkills();
  }
}
