import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/tools/table/table.component';
import { NavTabsComponent } from './components/tools/nav-tabs/nav-tabs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatTabsModule,
  MatButtonModule,
  MatDialogModule,
  MatTableModule,
  MatFormFieldModule,
  MatIconModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatInputModule,
  MatExpansionModule,
  MatSidenavModule,
  MatDialogConfig
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { OverlayContainer } from '@angular/cdk/overlay';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { PostEditorTabComponent } from './components/editor/post-editor-tab/post-editor-tab.component';
import { PostFilesTabComponent } from './components/post-files-tab/post-files-tab.component';
import { GraphQLModule } from './graphql.module';
import { CreatePostModalComponent } from './components/create-post-modal/create-post-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    NavTabsComponent,
    HomePageComponent,
    PostPageComponent,
    PostsPageComponent,
    PostEditorTabComponent,
    PostFilesTabComponent,
    CreatePostModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    CdkTableModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatInputModule,
    MatExpansionModule,
    MatSidenavModule,
    GraphQLModule
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
        width: '50vw',
        height: '80vh',
        autoFocus: true,
        closeOnNavigation: true,
        hasBackdrop: true
      } as MatDialogConfig
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CreatePostModalComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
  }
}
