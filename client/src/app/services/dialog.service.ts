import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreatePostModalComponent } from '../components/create-post-modal/create-post-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private matDialog: MatDialog) { }

  public CreatePost() {
    return this.matDialog.open(CreatePostModalComponent).afterClosed();
  }
}
