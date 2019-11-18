import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ks-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss']
})
export class NavTabsComponent implements OnInit {

  @Input()
  public tabs: {label: string, path: string}[] = [];

  constructor() { }

  ngOnInit() {
    
  }

}
