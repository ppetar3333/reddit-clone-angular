import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sort-post-comment',
  templateUrl: './sort-post-comment.component.html',
})
export class SortPostComment implements OnInit {
  public sortCommentsBy: Array<string>;
  public sortPostsBy: Array<string>;
  public selectedOptionPost: string = 'Select Item';
  public selectedOptionComment: string = 'Select Item';
  @Input('sortPostsDropdown') sortPostsDropdown: boolean = false;
  @Input('sortCommentsDropdown') sortCommentsDropdown: boolean = false;
  @Output('selectedOptionForPost') selectedOptionForPost = new EventEmitter<string>();
  @Output('selectedOptionForComment') selectedOptionForComment = new EventEmitter<string>();

  constructor() {
    this.sortCommentsBy = ['Select Item','Top', 'New', 'Old'];
    this.sortPostsBy = ['Select Item','New', 'Top', 'Hot'];
  }

  public ngOnInit(): void { }

  public onSelectedItemPost(event: string): void {
    this.selectedOptionPost = event;
    this.selectedOptionForPost.emit(this.selectedOptionPost);
  }

  public onSelectedItemComment(event: string): void {
    this.selectedOptionComment = event;
    this.selectedOptionForComment.emit(this.selectedOptionComment);
  }
}
