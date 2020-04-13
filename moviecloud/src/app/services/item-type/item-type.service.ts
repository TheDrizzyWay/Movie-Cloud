import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {
  itemType: string;

  constructor() {
    this.itemType = 'MOVIE';
  }
  
  public getType() : string {
    return this.itemType;
  }
  
  public setType(type : string): string {
    this.itemType = type;
    return this.itemType;
  }
  
}
