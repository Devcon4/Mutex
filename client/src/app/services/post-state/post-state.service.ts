import {gql} from '@apollo/client/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo, QueryRef,  } from 'apollo-angular';

import { BehaviorSubject } from 'rxjs';
import { TableService } from 'src/app/components/tools/table/table.service';
import { tap, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostStateService {

  public posts = new BehaviorSubject<{data: PostSimple[], ref: QueryRef<any, any>}>({data: [], ref: null});

  constructor(private apollo: Apollo, private tableService: TableService) { }

  watchPosts() {
    const ref = this.apollo.watchQuery<{posts: PostSimple[]}>({
      query: gql`
        query getPosts {
          posts {
            name,
            postId
          }
        }
      `
    });

    ref.valueChanges.subscribe((d => this.posts.next({data: d.data.posts, ref})));
  }

  createPost(post: PostInput) {
    post.postId = 0;

    this.apollo.mutate({ mutation: gql`
      mutation createPost($newPost:PostInput) {
        createPost(input: $newPost) {
          name
          postId
        }
      }
      `,
      variables: {
        newPost: post
      }
    }).subscribe(r => this.posts.getValue().ref.refetch());
  }
}

export interface PostInput {
  name: string;
  postId?: number;
}

export interface PostSimple {
  name: string;
  postId: number;
}
