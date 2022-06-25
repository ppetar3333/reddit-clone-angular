import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRulesComponent } from './change-rule.component';

describe('ChangeRulesComponent', () => {
  let component: ChangeRulesComponent;
  let fixture: ComponentFixture<ChangeRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
