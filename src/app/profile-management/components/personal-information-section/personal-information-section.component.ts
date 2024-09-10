import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-information-section',
  templateUrl: './personal-information-section.component.html',
  styleUrl: './personal-information-section.component.scss',
})
export class PersonalInformationSectionComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('/locations').subscribe((res) => {
      console.log(res);
    });
  }
}
