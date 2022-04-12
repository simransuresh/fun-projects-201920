import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUpdateRoleComponent } from './assign-update-role.component';

describe('AssignUpdateRoleComponent', () => {
  let component: AssignUpdateRoleComponent;
  let fixture: ComponentFixture<AssignUpdateRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignUpdateRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignUpdateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
