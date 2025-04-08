import {afterRender, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {CategoryService} from '../../../services/category.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../auth/services/auth.service';
import {IDataModel, menuItems} from '../../../../home/interfaces/data.model';

@Component({
    selector: 'app-header-category-menu',
    imports: [],
    templateUrl: './header-category-menu.component.html',
    styleUrl: './header-category-menu.component.scss'
})
export class HeaderCategoryMenuComponent implements OnInit, OnDestroy {
  dataCategory?: IDataModel | null;
  mainCategories: menuItems[] | undefined = undefined;
  private readonly _destroy = new Subject<void>();

  constructor(
    private category: CategoryService,
    private router: Router,
    private authService: AuthService,
  ) {
    afterRender(()=>{
      console.log('next render');
    })
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
        // this.mainCategories = this.dataCategory?.menuItems?.filter(x => x.parentId === 1);
      });
  }


  filterByParent(id: number) {
    const re=this.dataCategory?.menuItems.filter(x => x.parentId === id);
    console.log(re)
    return re;
  }

  goToCategory(item: any) {
    if (item.id == 30) {
      this.router.navigateByUrl(
        '/pages/content/products/q-kala/category-digital/mobile',
      );
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
