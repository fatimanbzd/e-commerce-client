import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationSkipped,
  Router,
  RouterEvent,
} from '@angular/router';
import { IBreadCrumbModel } from '../interfaces/bread-crumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadCrumbService {
  private readonly _breadcrumbsSubject = new BehaviorSubject<
    IBreadCrumbModel[]
  >([]);

  readonly breadcrumbs$ = this._breadcrumbsSubject.asObservable();
  breadcrumbs: IBreadCrumbModel[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.breadcrumbs = this.addBreadcrumb(activeRoute.root);
    this._breadcrumbsSubject.next(this.breadcrumbs);
    this.router.events
      .pipe(filter((event) => event instanceof RouterEvent))
      .subscribe((event) => {
        //todo
        //const root = this.router.routerState.snapshot.root;
        //  const breadcrumbs: IBreadCrumbModel[] = [];
        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationSkipped
        ) {
          //this.addBreadcrumb(activeRoute.root);
          this.breadcrumbs = this.addBreadcrumb(activeRoute.root);
          this._breadcrumbsSubject.next(this.breadcrumbs);
        }
      });
  }

  private addBreadcrumb(
    activeRoute: ActivatedRoute,
    url: string = '',
    breadcrumbs: IBreadCrumbModel[] = [],
  ): IBreadCrumbModel[] {
    const children: ActivatedRoute[] = activeRoute.children;

    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const breadcrumb = child.snapshot.data['breadcrumb'];
      const params = child.snapshot.params;
      if (breadcrumb) {
        if (typeof breadcrumb === 'function') {
          breadcrumbs.push({
            label: params['title'],
            url: url,
          });
        } else {
          breadcrumbs.push({
            label: breadcrumb,
            url: url,
          });
        }
      }

      return this.addBreadcrumb(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
