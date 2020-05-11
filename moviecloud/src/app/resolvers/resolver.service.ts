import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { GenericService } from '../services/generic/generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverService<T, S extends GenericService<T>> implements Resolve<T> {
  itemType: string;
  id: string;

  constructor(private service: S) { }

  resolve(route: ActivatedRouteSnapshot): Observable<T> {
    this.itemType = route.paramMap.get('type');
    this.id = route.paramMap.get('id');
    if(this.itemType !== 'people') {
      return this.service.getOne(this.itemType, this.id);
    }
  }
}
