import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subreddit } from 'src/app/@api/models/subreddit.model';
import { PostService } from 'src/app/@api/services/post.service';
import { SubredditService } from 'src/app/@api/services/subreddit.service';

@Component({
  selector: 'app-suspend-community',
  templateUrl: './suspend-community.component.html',
  styleUrls: ['./suspend-community.component.scss']
})
export class SuspendCommunityComponent implements OnInit {
  public suspendReason: string = '';
  public subreddit: Subreddit;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private subredditService: SubredditService,
    private postService: PostService,
    private router: Router
  ) { 
    this.subreddit = data.subreddit;
  }

  public ngOnInit(): void { }

  public getSuspendedReason(text: any): void {
    this.suspendReason = text.value;
  }

  public suspendBtn(): void {
    this.subreddit.isSuspended = true;
    this.subreddit.suspendedReason = this.suspendReason;
    this.postService.deletePostsBySubreddit(this.subreddit.subredditID).subscribe({
      next: () => this.updateSubreddit(),
      error: () => console.log('error'),
      complete: () => console.log('completed')
    });
  }

  public updateSubreddit(): void {
    this.subredditService.updateSubredditByID(this.subreddit, this.subreddit.subredditID).subscribe({
      next: () => { 
        console.log('successfuly');
        this.router.navigate(['']);
      },
      error: () => console.log('error'),
      complete: () => console.log('completed')
    });
  }
}
