import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUnblockUsersComponent } from './block-unblock-users.component';

describe('BlockUnblockUsersComponent', () => {
  let component: BlockUnblockUsersComponent;
  let fixture: ComponentFixture<BlockUnblockUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockUnblockUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockUnblockUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
