import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { ICategoryModel } from '../../../interfaces/category.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../auth/services/auth.service';

@Component({
    selector: 'app-header-category-menu',
    imports: [],
    templateUrl: './header-category-menu.component.html',
    styleUrl: './header-category-menu.component.scss'
})
export class HeaderCategoryMenuComponent implements OnInit, OnDestroy {
  dataCategory?: ICategoryModel;
  private readonly _destroy = new Subject<void>();

  constructor(
    private category: CategoryService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    return this.category
      .getCategory(1)
      .pipe(takeUntil(this._destroy))
      .subscribe((data) => {
        this.dataCategory = data;
      });
  }

  goToCategory(item: any) {
    if (item.id == 30) {
      this.router.navigateByUrl(
        '/pages/content/products/q-kala/category-digital/mobile',
      );
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
