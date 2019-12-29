// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { OverlayContainer } from '@angular/cdk/overlay';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

// Libs
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { GraphQLModule } from './graphql.module';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/tools/table/table.component';
import { NavTabsComponent } from './components/tools/nav-tabs/nav-tabs.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { PostEditorTabComponent } from './components/editor/post-editor-tab/post-editor-tab.component';
import { PostFilesTabComponent } from './components/post-files-tab/post-files-tab.component';
import { CreatePostModalComponent } from './components/create-post-modal/create-post-modal.component';
import { PortalModule } from '@angular/cdk/portal';

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
    PortalModule,
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
    GraphQLModule,
    MonacoEditorModule.forRoot()
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
