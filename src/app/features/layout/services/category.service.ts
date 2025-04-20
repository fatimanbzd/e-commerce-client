import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICategoryMenuModel} from '../../home/interfaces/data.model';
import {CacheService} from '../../../shared/services/cache.service';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly Categories_KEY = 'categories';

  constructor(private http: HttpClient,
              private cacheService: CacheService) {
  }

  getCategory(pi: number): Observable<ICategoryMenuModel> {
    return this.http.get<ICategoryMenuModel>(`api/Data/${pi}`);
    //return this.http.get<IDataModel>(`api/Data/${pi}`);
  }
}
