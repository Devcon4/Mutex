import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PostsPageComponent } from './components/posts-page/posts-page.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { PostEditorTabComponent } from './components/editor/post-editor-tab/post-editor-tab.component';
import { PostFilesTabComponent } from './components/post-files-tab/post-files-tab.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: HomePageComponent,
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: 'posts'
      // },
      {
        path: 'posts',
        component: PostsPageComponent
      },
    ]
  },
  {
    path: 'posts/:id',
    component: PostPageComponent,
    children: [

          {
            path: 'editor',
            component: PostEditorTabComponent
          },
          {
            path: 'files',
            component: PostFilesTabComponent
          },
          // {
          //   path: '',
          //   pathMatch: 'full',
          //   redirectTo: 'editor'
          // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
