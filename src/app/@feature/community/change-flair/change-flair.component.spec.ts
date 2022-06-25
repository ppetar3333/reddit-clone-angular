import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFlairComponent } from './change-flair.component';

describe('ChangeFlairComponent', () => {
  let component: ChangeFlairComponent;
  let fixture: ComponentFixture<ChangeFlairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeFlairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeFlairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
