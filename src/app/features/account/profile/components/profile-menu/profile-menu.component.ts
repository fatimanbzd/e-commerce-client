import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-profile-menu',
    imports: [ NgClass, RouterLink],
    templateUrl: './profile-menu.component.html',
    styleUrl: './profile-menu.component.scss'
})
export class ProfileMenuComponent {
  listItem = [
    {
      id: 0,
      title: 'پروفایل',
      icon: 'fa-user-circle',
      router: 'user-profile',
    },
    {
      id: 1,
      title: 'آدرس ها',
      icon: 'fa-address-book',
      router: 'location',
    },
    {
      id: 2,
      title: 'همه سفارش ها',
      icon: 'fa-address-book',
      router: 'order-detail',
    },
    {
      id: 3,
      title: 'تیکت های شما',
      icon: 'fa-ticket',
      router: 'ticket',
    },
  ];

  constructor(public router: Router) {}
}
