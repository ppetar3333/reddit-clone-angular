import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatListModule,
      MatMenuModule,
      MatSidenavModule,
      MatToolbarModule,
      MatTableModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatSelectModule,
      MatProgressSpinnerModule,
  ],
  exports: [
      MatButtonModule,
      MatIconModule,
      MatListModule,
      MatMenuModule,
      MatSidenavModule,
      MatToolbarModule,
      MatTableModule,
      MatPaginatorModule,
      MatDialogModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatProgressSpinnerModule,
  ]
})
export class CommonMaterialModule { }
