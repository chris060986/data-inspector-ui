import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLevelComponent } from './form-level.component';

describe('FormLevelComponent', () => {
  let component: FormLevelComponent;
  let fixture: ComponentFixture<FormLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
