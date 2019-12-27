import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-post-editor-tab',
  templateUrl: './post-editor-tab.component.html',
  styleUrls: ['./post-editor-tab.component.scss']
})
export class PostEditorTabComponent implements OnInit {

  @ViewChild('editor', { static: true}) editorRef: ElementRef;
  constructor() { }

  ngOnInit() {
    monaco.editor.create(this.editorRef.nativeElement, {
      language: 'markdown',
      theme: 'vsdark'
    });
  }

}
