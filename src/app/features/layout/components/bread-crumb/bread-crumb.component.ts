import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { IBreadCrumbModel } from '../../../../shared/interfaces/bread-crumb.model';
import { Observable } from 'rxjs';
import { BreadCrumbService } from '../../../../shared/services/bread-crumb.service';

@Component({
    selector: 'app-bread-crumb',
    imports: [RouterLink, AsyncPipe],
    templateUrl: './bread-crumb.component.html',
    styleUrl: './bread-crumb.component.scss'
})
export class BreadCrumbComponent {
  showBreadcrumbs: boolean = false;
  breadcrumbs$!: Observable<IBreadCrumbModel[]>;

  constructor(private readonly breadcrumbService: BreadCrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }
}
