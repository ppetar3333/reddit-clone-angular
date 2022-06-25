import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendCommunityComponent } from './suspend-community.component';

describe('SuspendCommunityComponent', () => {
  let component: SuspendCommunityComponent;
  let fixture: ComponentFixture<SuspendCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuspendCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspendCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
