import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
})
export class PageHeaderComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() buttonClass: string;
  @Input() buttonLink: string;
  @Input() buttonText: string;

  constructor() {}

  ngOnInit(): void {}
}
