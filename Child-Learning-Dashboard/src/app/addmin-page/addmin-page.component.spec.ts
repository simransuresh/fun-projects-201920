import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddminPageComponent } from './addmin-page.component';

describe('AddminPageComponent', () => {
  let component: AddminPageComponent;
  let fixture: ComponentFixture<AddminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
