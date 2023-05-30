import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';
import { Post } from 'src/app/@api/models/post.model';
import { CommentService } from 'src/app/@api/services/comment.service';
import { FlairService } from 'src/app/@api/services/flair.service';
import { PostService } from 'src/app/@api/services/post.service';
import { SubredditService } from 'src/app/@api/services/subreddit.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  public posts: Post[] = [];
  public postToReport!: Post;
  public retrievedImage: any;
  public base64Data: any;
  public retrieveResonse: any;
  public imageName: any;
  public searchTypes: Array<string> = ['Title', 'Description', 'Text From Pdf', 'Karma'];
  public andOrValues: Array<string> = ['And', 'Or'];
  public andOr: string = 'And';
  public selectedSearchType: string = '';
  public selectedSearchTypeSecond: string = '';
  public searchValue: string = '';
  public bottomKarma: any = null;
  public topKarma: any = null;
  public isChecked: boolean = false;
  public searchValueSecond: string = '';

  public subredditsList: any;
  public isCheckedSubreddit: boolean = false;
  public selectedSearchTypeSubreddit: string = '';
  public selectedSearchTypeSecondSubreddit: string = '';
  public serachValueSubreddit: string = '';
  public serachValueSecondSubreddit: string = '';
  public searchTypesSubreddit: Array<string> = ['Name', 'Description', 'Text From Pdf', 'Posts Count'];
  public bottomPostsCount: any = null;
  public topPostsCount: any = null;
  public andOrSubreddit: string = 'And';
  public showSubreddits: boolean = false;

  constructor(
    private postService: PostService,
    private subredditService: SubredditService,
    private flairService: FlairService
  ) {}

  public ngOnInit(): void {
    this.getPosts();
  }

  public handleSelectedOptionPost(event: string): void {
    this.postService.sortPostsBy(event).subscribe(data => this.posts = data)
  }

  public getSearchType(event: any): void {
    this.selectedSearchType = event.target.value;
  }

  public getSearchTypeSecond(event: any): void {
    this.selectedSearchTypeSecond = event.target.value;
  }

  public getSearchTypeSubreddit(event: any): void {
    this.selectedSearchTypeSubreddit = event.target.value;
  }

  public getSearchTypeSecondSubreddit(event: any): void {
    this.selectedSearchTypeSecondSubreddit = event.target.value;
  }

  public getValue(event: any): void {
    this.searchValue = event.target.value;
  }

  public getValueSubreddit(event: any): void {
    this.serachValueSubreddit = event.target.value;
  }

  public getValueSecond(event: any): void {
    this.searchValueSecond = event.target.value;
  }

  public getValueSecondSubreddit(event: any): void {
    this.serachValueSecondSubreddit = event.target.value;
  }

  public getBottomKarma(event: any): void {
    this.bottomKarma = event.target.value;
  }

  public getTopKarma(event: any): void {
    this.topKarma = event.target.value;
  }

  public getBottomPostsSubreddit(event: any): void {
    this.bottomPostsCount = event.target.value;
  }

  public getTopPostsSubreddit(event: any): void {
    this.topPostsCount = event.target.value;
  }

  public checkboxChanged(): void {
    this.isChecked = !this.isChecked;
  }

  public checkboxChangedSubreddit(): void {
    this.isCheckedSubreddit = !this.isCheckedSubreddit;
  }

  public getAndOr(event: any): void {
    this.andOr = event.target.value;
  }

  public getAndOrSubreddit(event: any): void {
    this.andOrSubreddit = event.target.value;
  }

  public search(): void {
    this.posts = [];

    if (this.selectedSearchType === 'Description') {
      this.postService.searchByDesc(this.searchValue).subscribe((resp) => {
        this.posts = resp;
      });
    } else if (this.selectedSearchType === 'Title') {
      this.postService.searchByTitle(this.searchValue).subscribe((resp) => {
        this.posts = resp;
      });
    } else if (this.selectedSearchType === 'Text From Pdf') {
      this.postService.searchByPdf(this.searchValue).subscribe((resp) => {
        this.posts = resp;
      });
    } else {
      this.postService.searchByKarma(this.bottomKarma, this.topKarma).subscribe((resp) => {
        this.posts = resp;
      });
    }
    if ((this.selectedSearchType !== '' && this.selectedSearchType !== 'Select Searching Type') && (this.selectedSearchTypeSecond !== '' && this.selectedSearchTypeSecond !== 'Select Searching Type')) {
      // implement search by two fields
      console.log(this.selectedSearchType, this.selectedSearchTypeSecond)
    }
  }

  private getPosts() {
    this.postService.getPosts().subscribe((response) => {
      this.posts = response;
      this.posts.forEach((element) => {
        if (element.imagePath) {
          this.postService
            .getImageByImageName(element.imagePath)
            .subscribe((data) => {
              this.retrieveResonse = data;
              this.base64Data = this.retrieveResonse.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
              element.imagePreview = this.retrievedImage;
            });
        }
      });
    });
  }

  public searchSubreddit(): void {
    this.showSubreddits = true;
    this.subredditsList = [];

    if (this.selectedSearchTypeSubreddit === 'Description') {
      this.subredditService.searchByDesc(this.serachValueSubreddit).subscribe((resp) => {
        this.subredditsList = resp;
        this.populateSubreddits();
      });
    } else if (this.selectedSearchTypeSubreddit === 'Name') {
      this.subredditService.searchByName(this.serachValueSubreddit).subscribe((resp) => {
        this.subredditsList = resp;
        console.log(this.subredditsList)
        this.populateSubreddits();
      });
    } else if (this.selectedSearchTypeSubreddit === 'Text From Pdf') {
      this.subredditService.searchByPdf(this.serachValueSubreddit).subscribe((resp) => {
        this.subredditsList = resp;
        this.populateSubreddits();
      });
    } else {
      this.subredditService.searchByPostsCount(this.bottomPostsCount, this.topPostsCount).subscribe((resp) => {
        this.subredditsList = resp;
        this.populateSubreddits();
      });
    }
    if ((this.selectedSearchTypeSubreddit !== '' && this.selectedSearchTypeSubreddit !== 'Select Searching Type') && (this.selectedSearchTypeSecondSubreddit !== '' && this.selectedSearchTypeSecondSubreddit !== 'Select Searching Type')) {
      // implement search by two fields
      console.log(this.selectedSearchTypeSubreddit, this.selectedSearchTypeSecondSubreddit)
    }
  }

  public populateSubreddits(): void {
    this.subredditsList.forEach((item: any) => {
      item.flairs = [];
      this.flairService.getFlairsBySubredditId(item.subredditID ? item.subredditID : item.id).subscribe((data) => {
        if (data.length > 0) {
          data.forEach(element => {
            this.flairService.getFlairByID(element.flairid).subscribe((data) => {
              item.flairs.push(data.name);
            })
          });
        } else {
          item.flairs = [];
        }
      })
    });
  }
}
