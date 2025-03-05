import { Component, Input } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import {
  NzMenuDirective,
  NzMenuItemComponent,
  NzSubMenuComponent,
} from 'ng-zorro-antd/menu';
import { RouterLink } from '@angular/router';
import { IMenuModel } from '../../interfaces/menu.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'admin-navbar',
  imports: [
    NzLayoutModule,
    NzIconDirective,
    NzIconModule,
    NzMenuDirective,
    NzMenuItemComponent,
    NzSubMenuComponent,
    RouterLink,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input() isCollapsed = false;

  public menuList: IMenuModel[] = [
    {
      label: 'داشبورد',
      icon: 'home',
      route: '/dashboard',
    },
    {
      label: 'مشتریان',
      icon: 'team',
      children: [
        {
          label: 'لیست مشتریان',
          route: 'customer-list',
        },
      ],
    },
  ];
}
