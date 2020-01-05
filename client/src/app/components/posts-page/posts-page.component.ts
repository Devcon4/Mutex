import { Component, OnInit } from '@angular/core';
import { TableSchema, TableDataProviderType, SearchResult } from '../tools/table/table.component';
import { of } from 'rxjs';
import { PostSimple, PostStateService } from 'src/app/services/post-state/post-state.service';
import { map, tap } from 'rxjs/operators';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {

  constructor(private postState: PostStateService, private dialogService: DialogService) { }

  public postSchema: TableSchema<PostSimple> = {
    Title: { headerName: 'Title', displayExp: x => x.name, pathExp: x => `../../posts/${x.postId}/editor` }
  };

  ngOnInit() {
    this.postState.watchPosts();
  }

  public postDataProvider: TableDataProviderType<SearchResult<PostSimple>> = (term, index, size, sort) => {
    if (!sort) {
      sort = { active: 'Title', direction: 'asc' };
    }

    return this.postState.posts.pipe(map(l => ({data: l.data, count: l.data.length})));
  }

  public openCreateModal() {
    this.dialogService.CreatePost();
  }
}
