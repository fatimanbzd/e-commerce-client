import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMenuModel } from '../../interfaces/menu.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'admin-navbar',
  imports: [
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
