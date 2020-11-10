import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';

interface BreadCrumbItem {
  text: string;
  link?: string;
}

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css'],
})
export class BreadCrumbComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  urls: Array<BreadCrumbItem> = [];

  ngOnInit(): void {
    this.urls = this.getBreadCrumb(this.route.snapshot, []);
  }

  private getBreadCrumb(
    snapshot: ActivatedRouteSnapshot,
    urls: Array<BreadCrumbItem>
  ): Array<BreadCrumbItem> {
    if (snapshot?.parent) {
      this.getBreadCrumb(snapshot.parent, urls);
      if (snapshot?.url[0]?.path) {
        urls.push({
          text: snapshot?.data?.title,
          link: '/' + snapshot?.url[0]?.path,
        });
      }
    }
    return urls;
  }

  isLastUrl(index: number): boolean {
    return index + 1 === this.urls.length;
  }
}
