import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-search-result',
  templateUrl: './community-search-result.component.html',
  styleUrls: ['./community-search-result.component.scss']
})
export class CommunitySearchResultComponent implements OnInit {
  @Input('subredditsList') subredditsList: Array<any> = [];

  constructor() { }

  public ngOnInit(): void {
  }

}
