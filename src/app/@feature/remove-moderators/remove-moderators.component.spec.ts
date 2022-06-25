import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveModeratorsComponent } from './remove-moderators.component';

describe('RemoveModeratorsComponent', () => {
  let component: RemoveModeratorsComponent;
  let fixture: ComponentFixture<RemoveModeratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveModeratorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveModeratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
