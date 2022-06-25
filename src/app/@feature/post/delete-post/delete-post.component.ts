import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from 'src/app/@api/services/post.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {
  private postId: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<DeletePostComponent>, 
    private postService: PostService) 
  { }

  public ngOnInit(): void {
    this.postId = this.data.postId;
  }

  public deletePost(): void {
    this.postService.deletePostByID(this.postId).subscribe(() => {})
    this.dialogRef.close({event:'deleted'});
  }
}
