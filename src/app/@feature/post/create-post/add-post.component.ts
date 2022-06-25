import { Component, OnInit } from '@angular/core';
import { EReactionType } from 'src/app/@api/models/EReactionType';
import { Post } from 'src/app/@api/models/post.model';
import { Reaction } from 'src/app/@api/models/reaction.model';
import { VoteService } from 'src/app/@api/services/vote.service';
import { PostValidation } from 'src/app/@common/validations/post-validation';
import { AuthService } from '../../../@api/auth/auth.service';
import { AddPost } from '../../../@api/models/add-post.model';
import { Flair } from '../../../@api/models/flair.model';
import { Subreddit } from '../../../@api/models/subreddit.model';
import { User } from '../../../@api/models/user.model';
import { FlairService } from '../../../@api/services/flair.service';
import { PostService } from '../../../@api/services/post.service';
import { SubredditService } from '../../../@api/services/subreddit.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
})
export class AddPostComponent implements OnInit {
  subreddits: Array<Subreddit>;
  flairs: Array<Flair>;
  imagePath: any;
  imgURL: any;
  validation: boolean = true;
  post: AddPost;
  reaction!: Reaction;
  user!: User;
  flair!: Flair;
  subreddit!: Subreddit;
  title: string = '';
  description: string = '';
  image: string = '';
  bigImageError: boolean = false;
  bigImageErrorMessage: string = 'Maximum size of image is 2MB';

  constructor(
    private subredditService: SubredditService,
    private flairService: FlairService,
    private postService: PostService,
    private authService: AuthService,
    private voteService: VoteService,
    public validations: PostValidation
  ) {
    this.subreddits = [];
    this.flairs = [];
    this.post = new AddPost(
      this.title,
      this.description,
      this.user,
      this.flair,
      this.subreddit,
      this.image
    );
  }

  public ngOnInit(): void {
    this.preSelectedSubreddit();
    this.getSubredditNames();
    this.getFlairNames();
    this.getLoggedInUser();
  }

  public getSubredditNames(): void {
    this.subredditService.getSubreddits().subscribe((data) => {
      this.subreddits = data;
    });
  }

  public preSelectedSubreddit(): void {
    this.subredditService.getSubreddits().subscribe(data => {
      this.subreddit = data[0];
    })
  }

  public getFlairNames(): void {
    this.flairService.getFlairs().subscribe((data) => {
      this.flairs = data;
    });
  }

  public preview(files: any): void {
    if (files[0].size > 2062954) {
      this.bigImageError = true;
    } else {
      this.bigImageError = false;
      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }
  }

  public createPost(titleInput: string, description: string): void {
    if (!this.validations.ok) {
      this.post.title = titleInput;
      this.post.description = description;
      this.post.user = this.user;
      this.post.subreddit = this.subreddit;

      if (this.imagePath) this.post.image = this.imagePath[0].name;

      this.postService.savePost(this.post).subscribe((postId) => this.automaticallyUpvotePost(postId as unknown as number));

      if (this.imagePath)
        this.postService.saveImage(this.imagePath[0]).subscribe(() => {});

      if (this.validation) {
        window.location.href = '';
      }
    }
  }

  public automaticallyUpvotePost(postId: number): void {
    this.postService.getPostByID(postId).subscribe(data => {
      this.reaction = {
        post: data,
        user: this.user,
        type: EReactionType.upvote,
      };
      this.voteService.votePost(this.reaction).subscribe(() => {});
    })
  }

  public getLoggedInUser(): void {
    this.authService.getLoggedInUser().subscribe((data) => {
      this.user = data;
    });
  }

  public getFlair(flairSelected: any): void {
    this.flairService
      .getFlairByName(flairSelected.target.value)
      .subscribe((data) => {
        this.flair = data;
        this.post.flair = this.flair;
      });
  }

  public getSubreddit(subredditSelected: any): void {
    console.log(subredditSelected.target.value)
    this.subredditService
      .getSubredditByName(subredditSelected.target.value)
      .subscribe((data) => {
        this.subreddit = data;
        this.post.subreddit = data;
      });
  }
}
