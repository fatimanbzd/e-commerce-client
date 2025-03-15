import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {BreadCrumbComponent} from '../../features/layout/components/bread-crumb/bread-crumb.component';
import {filter, Subject, takeUntil} from 'rxjs';
import {OrderNavigationService} from '../../shared/services/order-navigation.service';

@Component({
    selector: 'app-content',
  imports: [RouterOutlet, BreadCrumbComponent],
    templateUrl: './content.component.html',
    styleUrl: './content.component.scss'
})
export class ContentComponent {
  private _destroy = new Subject<void>();

  constructor(
    private router: Router,
    private orderNavigationService: OrderNavigationService,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._destroy),
      )
      .subscribe((event: NavigationEnd) => {
        if (!event.urlAfterRedirects.startsWith('/pages/content/order')) {
          orderNavigationService.clearOrderData();
        }
      });
  }
}
