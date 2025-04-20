import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {CategoryService} from '../../../services/category.service';
import {RouterLink} from '@angular/router';
import {ICategoryMenuModel, IMenuItemModel} from '../../../../home/interfaces/data.model';

@Component({
  selector: 'app-header-category-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './header-category-menu.component.html',
  styleUrl: './header-category-menu.component.scss'
})
export class HeaderCategoryMenuComponent implements OnInit, OnDestroy {
  dataCategory!: ICategoryMenuModel;
  mainCategories: IMenuItemModel[] | undefined = undefined;
  private readonly _destroy = new Subject<void>();

  constructor(
    private category: CategoryService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    return this.category
      .getCategory(1)
      .pipe(takeUntil(this._destroy))
      .subscribe((data) => {
        this.dataCategory = data;
        this.mainCategories = data?.menuItems?.filter((x: IMenuItemModel) => x.parentId === 1);
      });
  }

  filterByParent(id: number): IMenuItemModel[] {
    return this.dataCategory?.menuItems.filter(x => x.parentId === id);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
