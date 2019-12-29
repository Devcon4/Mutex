import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ComponentRef,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  TemplateRef,
  AfterViewInit,
  OnDestroy,
  SecurityContext
} from '@angular/core';
import * as monaco from 'monaco-editor';
import Showdown, { Converter } from 'showdown';

import { EditorComponent } from 'ngx-monaco-editor';
import { PortalHost, DomPortalHost, TemplatePortal, DomPortal } from '@angular/cdk/portal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-editor-tab',
  templateUrl: './post-editor-tab.component.html',
  styleUrls: ['./post-editor-tab.component.scss']
})
export class PostEditorTabComponent {

  options: monaco.editor.IStandaloneEditorConstructionOptions = {
    language: 'markdown',
    theme: 'vs-dark',
    minimap: {
      enabled: false
    },
    scrollbar: {

    }
  };

  // tslint:disable-next-line:variable-name
  private _code = '';
  preview = '';
  converter = new Converter({
    tables: true,
    ghCodeBlocks: true,
    emoji: true,
  });

  get code() {
    return this._code;
  }

  set code(val: string) {
    this._code = val;
    const rend = this.converter.makeHtml(this._code);
    setTimeout(() => {
      this.preview = this.domSanitizer.sanitize(SecurityContext.HTML, rend);
    });
    console.log(rend, this.preview);

  }

  @ViewChild('editorRef') editorRef: ComponentRef<EditorComponent>;
  constructor(
    private domSanitizer: DomSanitizer
  ) {
    this.converter.setFlavor('github');
  }
}
