import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFilesTabComponent } from './post-files-tab.component';

describe('PostFilesTabComponent', () => {
  let component: PostFilesTabComponent;
  let fixture: ComponentFixture<PostFilesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFilesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFilesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
