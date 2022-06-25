import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentService } from 'src/app/@api/services/comment.service';

@Component({
  selector: 'app-delete-comment',
  templateUrl: './delete-comment.component.html',
  styleUrls: ['./delete-comment.component.scss']
})
export class DeleteCommentComponent implements OnInit {
  private commentId: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<DeleteCommentComponent>, 
    private commentService: CommentService) 
  { }

  public ngOnInit(): void {
    this.commentId = this.data.commentId;
  }

  public deleteComment(): void {
    this.commentService.deleteCommentByID(this.commentId).subscribe(() => {})
    this.dialogRef.close({event:'deleted'});
  }
}
