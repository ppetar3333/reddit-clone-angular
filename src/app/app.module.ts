import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './@feature/log-in/log-in.component';
import { RegisterComponent } from './@feature/register/register.component';
import { HomePageComponent } from './@feature/home-page/home-page.component';
import { CommunityPageComponent } from './@feature/community/community-page/community-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoteButtonComponent } from './@feature/post/vote-posts/vote-button.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JwtInterceptor } from './@api/interceptors/jwt-interceptors';
import { SinglePostComponent } from './@feature/post/single-post/single-post.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommentsComponent } from './@feature/comments/comments.component';
import { VoteCommentsComponent } from './@feature/comments/vote-comments/vote-comments.component';
import { AddPostComponent } from './@feature/post/create-post/add-post.component';
import { CreateCommunity } from './@feature/community/create-community/create-community.component';
import { SortPostComment } from './@feature/sort-post-comment/sort-post-comment.component';
import { PostCardComponent } from './@feature/post/post-card/post-card.component';
import { UserProfileComponent } from './@feature/user-profile/user-profile.component';
import { CommonUiModule } from './@ui/common-ui.module';
import { FooterComponent } from './@ui/footer/footer.component';
import { NoAccessDialogComponent } from './@ui/no-access-dialog/no-access-dialog.component';
import { DateAgoPipe } from './@ui/pipes/date-ago.pipe';
import { ReportDialogComponent } from './@feature/report-dialog/report-dialog.component';
import { RouterModule } from '@angular/router';
import { BlockUnblockUsersComponent } from './@feature/block-unblock-users/block-unblock-users.component';
import { RemoveModeratorsComponent } from './@feature/remove-moderators/remove-moderators.component';
import { ChangePasswordComponent } from './@feature/change-password/change-password.component';
import { SuspendCommunityComponent } from './@feature/community/suspend-community/suspend-community.component';
import { ReportedDataComponent } from './@feature/reported-data/reported-data.component';
import { PostReportedComponent } from './@feature/post/post-reported/post-reported.component';
import { ChangeFlairComponent } from './@feature/community/change-flair/change-flair.component';
import { ChangeRulesComponent } from './@feature/community/change-rules/change-rule.component';
import { CreateEditRuleComponent } from './@feature/community/change-rules/create-edit-rule/create-edit-rule.component';
import { CreateEditFlairComponent } from './@feature/community/change-flair/create-edit-flair/create-edit-flair.component';
import { DeletePostComponent } from './@feature/post/delete-post/delete-post.component';
import { DeleteCommentComponent } from './@feature/comments/delete-comment/delete-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    CommunityPageComponent,
    VoteButtonComponent,
    SinglePostComponent,
    CommentsComponent,
    VoteCommentsComponent,
    FooterComponent,
    NoAccessDialogComponent,
    DateAgoPipe,
    AddPostComponent,
    CreateCommunity,
    SortPostComment,
    PostCardComponent,
    UserProfileComponent,
    ReportDialogComponent,
    BlockUnblockUsersComponent,
    RemoveModeratorsComponent,
    ChangePasswordComponent,
    SuspendCommunityComponent,
    ReportedDataComponent,
    PostReportedComponent,
    ChangeFlairComponent,
    ChangeRulesComponent,
    CreateEditRuleComponent,
    CreateEditFlairComponent,
    DeletePostComponent,
    DeleteCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    CommonUiModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
  ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
