import { Component, inject, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss',
  // providers: [{ provide: ControlContainer, useExisting: NgForm }],
  // viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class SkillsFormComponent implements OnInit {
  @Input() formGroup: FormGroup;

  // private controlContainer = inject(ControlContainer);

  // constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    // this.form = this.controlContainer.control.get('skillsForm') as FormGroup;
  }
}
