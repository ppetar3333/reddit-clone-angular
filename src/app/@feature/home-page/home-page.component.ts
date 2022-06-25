import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, filter, map, Observable, switchMap, tap } from 'rxjs';
import { Post } from 'src/app/@api/models/post.model';
import { CommentService } from 'src/app/@api/services/comment.service';
import { PostService } from 'src/app/@api/services/post.service';

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

  constructor(private postService: PostService) {}

  public ngOnInit(): void {
    this.getPosts();
  }

  public handleSelectedOptionPost(event: string): void {
    this.postService.sortPostsBy(event).subscribe(data => this.posts = data)
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
}
