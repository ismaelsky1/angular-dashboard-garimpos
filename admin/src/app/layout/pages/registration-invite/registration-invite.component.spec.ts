import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationInviteComponent } from './registration-invite.component';

describe('RegistrationInviteComponent', () => {
  let component: RegistrationInviteComponent;
  let fixture: ComponentFixture<RegistrationInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
