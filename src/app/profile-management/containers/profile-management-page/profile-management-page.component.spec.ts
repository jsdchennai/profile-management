import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileManagementPageComponent } from './profile-management-page.component';

describe('ProfileManagementPageComponent', () => {
  let component: ProfileManagementPageComponent;
  let fixture: ComponentFixture<ProfileManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
