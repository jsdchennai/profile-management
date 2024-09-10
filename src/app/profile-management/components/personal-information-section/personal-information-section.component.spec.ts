import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInformationSectionComponent } from './personal-information-section.component';

describe('PersonalInformationSectionComponent', () => {
  let component: PersonalInformationSectionComponent;
  let fixture: ComponentFixture<PersonalInformationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalInformationSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInformationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
