import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySearchResultComponent } from './community-search-result.component';

describe('CommunitySearchResultComponent', () => {
  let component: CommunitySearchResultComponent;
  let fixture: ComponentFixture<CommunitySearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunitySearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitySearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
