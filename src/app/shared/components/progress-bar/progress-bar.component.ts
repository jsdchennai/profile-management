import { Component, inject, OnInit } from '@angular/core';
import { ProfileProgressService } from '../../services';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent implements OnInit {
  public progressValue: number;

  private profileProgressService = inject(ProfileProgressService);

  abc() {
    this.profileProgressService.getProgressValue().subscribe((value) => {
      this.progressValue = value;
    });
  }

  ngOnInit(): void {
    this.abc();
  }
}
