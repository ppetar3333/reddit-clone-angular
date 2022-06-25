import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedDataComponent } from './reported-data.component';

describe('ReportedDataComponent', () => {
  let component: ReportedDataComponent;
  let fixture: ComponentFixture<ReportedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportedDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
