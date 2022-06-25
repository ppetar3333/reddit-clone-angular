import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { NavUserComponent } from './nav/nav-user/nav-user.component';
import { NavModeratorComponent } from './nav/nav-moderator/nav-moderator.component';
import { NavAdminComponent } from './nav/nav-admin/nav-admin.component';
import { CommonMaterialModule } from './common-material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavComponent,
    NavUserComponent,
    NavModeratorComponent,
    NavAdminComponent,
  ],
  imports: [
    CommonModule,
    CommonMaterialModule,
    RouterModule
  ], 
  exports: [
    CommonMaterialModule,
    NavComponent,
    NavUserComponent,
    NavModeratorComponent,
    NavAdminComponent,
  ]
})
export class CommonUiModule { }
