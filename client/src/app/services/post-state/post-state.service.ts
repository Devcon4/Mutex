import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo,  } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostStateService {

  public posts = new BehaviorSubject<{}>([]);

  constructor(private apollo: Apollo) { }

  watchPosts() {
    this.apollo.watchQuery({
      query: gql`
        {
          posts {
            content,
          }
        }
      `
    }).valueChanges.subscribe(r => this.posts.next(r.data));
  }
}
