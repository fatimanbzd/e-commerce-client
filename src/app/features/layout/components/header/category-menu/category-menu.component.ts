import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICategoryModel } from '../../../interfaces/category.model';
import { CategoryService } from '../../../services/category.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../auth/services/auth.service';

@Component({
    selector: 'app-category-menu',
    imports: [],
    templateUrl: './category-menu.component.html',
    styleUrl: './category-menu.component.scss'
})
export class CategoryMenuComponent implements OnInit, OnDestroy {
  //   dataCategory?: ICategoryModel;
  //   @Input() level?:number ;
  //
  //   private _destroy = new Subject<void>();
  //
  //   constructor( private category: CategoryService,
  //                private router: Router) {
  //   }
  //
  // ngOnInit() {
  //
  //   if (this.level)
  //     this.getData(this.level);
  // }
  //
  //   getData(pi: number) {
  //     return this.category.getCategory(pi)
  //       .pipe(takeUntil(this._destroy))
  //       .subscribe(data =>
  //         this.dataCategory = data)
  //   }
  //
  //   goToCategory(item: any) {
  //     if (item.id == 30) {
  //       this.router.navigateByUrl('/pages/content/products')
  //     }
  //   }
  //
  //   ngOnDestroy() {
  //     this._destroy.next();
  //     this._destroy.complete();
  //   }
  dataCategory?: ICategoryModel;
  hideRightMenu = true;
  focusBoxModal = false;
  filteredItems: any;
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

  smallHeader() {
    this.hideRightMenu = !this.hideRightMenu;
  }

  leaveMouse() {
    this.focusBoxModal = false;
  }

  hiddenModal() {
    if (!this.focusBoxModal) this.hideRightMenu = true;
  }

  interMouse() {
    this.focusBoxModal = true;
  }

  goToHome() {
    this.router.navigateByUrl('/pages/content/home');
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  onclickMenu($event: { id: number | string }) {
    const id = $event.id;
    if (this.dataCategory?.menuItems) {
      this.filteredItems = this.dataCategory.menuItems.filter(
        (item: { parentId: number | string }) => item.parentId === id,
      );
    }
  }
}
