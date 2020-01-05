import { Component, OnInit } from '@angular/core';
import { PostStateService, PostInput } from 'src/app/services/post-state/post-state.service';
import { FormGroup, FormControl } from '@angular/forms';
import createFormGroup from 'src/app/helpers/FormHelper';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss']
})
export class CreatePostModalComponent implements OnInit {

  formDefaults: PostInput = {
    name: ''
  };

  createForm = createFormGroup<PostInput>(this.formDefaults, {
    name: new FormControl()
  });

  constructor(private postState: PostStateService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.postState.createPost(this.createForm.value);
  }

}
