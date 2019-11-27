import { Component, OnInit } from '@angular/core';
import { TableSchema, TableDataProviderType, SearchResult } from '../tools/table/table.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public postDataProvider: TableDataProviderType<SearchResult<{}>> = (term, index, size, sort) => {
    if(!sort) {
      sort = {active: 'Title', direction: 'asc'};
    }

    return of({ data: [{Title: 'fake Test'}], count: 1 });
  }

  public postSchema: TableSchema<{}> = {
    'Title': {headerName: 'Title', displayExp: x => 'test!'}
  }

}
