import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditRuleComponent } from './create-edit-rule.component';

describe('CreateRuleComponent', () => {
  let component: CreateEditRuleComponent;
  let fixture: ComponentFixture<CreateEditRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
