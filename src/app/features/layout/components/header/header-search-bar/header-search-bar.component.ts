import {Component, HostListener, OnDestroy} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchService} from '../../../../../shared/services/search.service';
import {debounceTime, distinctUntilChanged, Subject, takeUntil} from 'rxjs';
import {IProductSearchResponseModel} from '../../../../../shared/interfaces/product-search.model';
import {Router, RouterLink} from '@angular/router';
import {FullSrcPipe} from '../../../../../shared/pipes/full-src.pipe';
import {PricePipe} from '../../../../../shared/pipes/price.pipe';

@Component({
    selector: 'app-header-search-bar',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        FullSrcPipe,
        PricePipe,
        RouterLink,
    ],
    templateUrl: './header-search-bar.component.html',
    styleUrl: './header-search-bar.component.scss'
})
export class HeaderSearchBarComponent implements OnDestroy {
  searchQuery!: string;
  suggestionProductList: IProductSearchResponseModel[] = [];
  private readonly _destroy = new Subject<void>();

  constructor(
    private searchService: SearchService,
    private router: Router,
  ) {}

  suggestProducts(e: any) {
    if (
      !e.target.value ||
      e.target.value === '' ||
      (e.target.value && e.target.value.length < 3)
    ) {
      this.suggestionProductList = [];
      return;
    }

    this.searchService
      .productSearch(e.target.value)
      .pipe(takeUntil(this._destroy), debounceTime(200), distinctUntilChanged())
      .subscribe((products) => (this.suggestionProductList = products));
  }

  @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
    event.stopPropagation();
    this.searchQuery = '';
    this.suggestionProductList = [];
  }

  goToDetailProduct(id: number, title: string) {
    this.router.navigateByUrl(`/pages/content/product/${id}/${title}`);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
