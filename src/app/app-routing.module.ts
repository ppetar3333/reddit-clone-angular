import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './@feature/post/create-post/add-post.component';
import { CreateCommunity } from './@feature/community/create-community/create-community.component';
import { CommunityPageComponent } from './@feature/community/community-page/community-page.component';
import { LoginComponent } from './@feature/log-in/log-in.component';
import { HomePageComponent } from './@feature/home-page/home-page.component';
import { RegisterComponent } from './@feature/register/register.component';
import { SinglePostComponent } from './@feature/post/single-post/single-post.component';
import { UserProfileComponent } from './@feature/user-profile/user-profile.component';
import { BlockUnblockUsersComponent } from './@feature/block-unblock-users/block-unblock-users.component';
import { RemoveModeratorsComponent } from './@feature/remove-moderators/remove-moderators.component';
import { ChangePasswordComponent } from './@feature/change-password/change-password.component';
import { ReportedDataComponent } from './@feature/reported-data/reported-data.component';
import { ChangeRulesComponent } from './@feature/community/change-rules/change-rule.component';
import { ChangeFlairComponent } from './@feature/community/change-flair/change-flair.component';
import { CanActivateAuthGuard } from './@api/guards/always-auth-guard.guard';
import { NoAccessAuthGuard } from './@api/guards/no-access-guard.guard';
import { HasRoleGuard } from './@api/guards/has-role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAccessAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAccessAuthGuard],
  },
  {
    path: 'posts',
    component: HomePageComponent,
  },
  {
    path: 'post/:postID',
    component: SinglePostComponent,
  },
  {
    path: 'community/:subredditID',
    component: CommunityPageComponent,
  },
  {
    path: 'add-post',
    component: AddPostComponent,
    canActivate: [CanActivateAuthGuard],
  },
  {
    path: 'add-subreddit',
    component: CreateCommunity,
    canActivate: [CanActivateAuthGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [CanActivateAuthGuard],
  },
  {
    path: 'block-unblock-users',
    component: BlockUnblockUsersComponent,
    canActivate: [CanActivateAuthGuard, HasRoleGuard],
    data: {
      role: 'moderator'
    }
  },
  {
    path: 'remove-moderator',
    component: RemoveModeratorsComponent,
    canActivate: [CanActivateAuthGuard, HasRoleGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [CanActivateAuthGuard],
  },
  {
    path: 'reported-data',
    component: ReportedDataComponent,
    canActivate: [CanActivateAuthGuard, HasRoleGuard],
    data: {
      role: 'moderator'
    }
  },
  {
    path: 'change-rules/:subredditID',
    component: ChangeRulesComponent,
    canActivate: [CanActivateAuthGuard, HasRoleGuard],
    data: {
      role: 'moderator'
    }
  },
  {
    path: 'change-flairs/:subredditID',
    component: ChangeFlairComponent,
    canActivate: [CanActivateAuthGuard, HasRoleGuard],
    data: {
      role: 'moderator'
    }
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
