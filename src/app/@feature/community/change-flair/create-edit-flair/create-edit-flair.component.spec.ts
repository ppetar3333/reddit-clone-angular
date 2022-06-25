import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditFlairComponent } from './create-edit-flair.component';

describe('CreateEditFlairComponent', () => {
  let component: CreateEditFlairComponent;
  let fixture: ComponentFixture<CreateEditFlairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditFlairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditFlairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
