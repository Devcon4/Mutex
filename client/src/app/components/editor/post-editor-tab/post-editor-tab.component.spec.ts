import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostEditorTabComponent } from './post-editor-tab.component';

describe('PostEditorTabComponent', () => {
  let component: PostEditorTabComponent;
  let fixture: ComponentFixture<PostEditorTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostEditorTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditorTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
