import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Subject, takeUntil} from 'rxjs';
import {ICategoryMenuModel} from '../../interfaces/data.model';
import {qlandServiceType} from '../../pipes/qland-service-type.pipe';

@Component({
  selector: 'app-category-box',
  imports: [qlandServiceType],
  templateUrl: './category-box.component.html',
  styleUrl: './category-box.component.scss'
})
export class CategoryBoxComponent implements OnInit, OnDestroy {
  dataCategory?: ICategoryMenuModel;
  @Input() level?: number;

  private readonly _destroy = new Subject<void>();

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    if (this.level) this.getData(this.level);
  }

  getData(pi: number) {
    return this.dataService
      .data(pi)
      .pipe(takeUntil(this._destroy))
      .subscribe((data) => (this.dataCategory = data));
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
