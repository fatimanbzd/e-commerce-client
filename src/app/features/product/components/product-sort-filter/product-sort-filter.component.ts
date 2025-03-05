import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-sort-filter',
  imports: [RouterLink, NgClass],
  templateUrl: './product-sort-filter.component.html',
  styleUrl: './product-sort-filter.component.scss',
})
export class ProductSortFilterComponent implements OnInit, OnDestroy {
  private pageNumber!: number | null;
  sortType = 0;
  private readonly _destroy = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this._destroy))
      .subscribe((paramMap) => {
        this.pageNumber = +paramMap['pageNumber'] || null;
        this.sortType = +paramMap['sort'] || 0;
        this.updateFilters({ sort: this.sortType, isAsc: true });
      });
  }

  updateFilters(newFilters: any) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: newFilters,
      queryParamsHandling: 'merge',
    });
  }

  onSortChange(event: Event, sortCriteria: number) {
    event.preventDefault();
    this.sortType = sortCriteria;
    if (this.pageNumber) {
      this.updateFilters({ sort: sortCriteria, pageNumber: null, isAsc: true });
    } else this.updateFilters({ sort: sortCriteria, isAsc: true });
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
