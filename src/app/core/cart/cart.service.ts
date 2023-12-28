import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Product} from "../product/product.model";
import {Item} from "./item.interface";

@Injectable({
  providedIn:'root',
})
export class CartService{

  private item$:BehaviorSubject<Item[]>;

  constructor(){
    // @ts-ignore
    let items = JSON.parse(localStorage.getItem('cart')) as Item[] ;
    if(items === null){
      items = [];
    }
    this.item$ = new BehaviorSubject<Item[]>(items);
  }

  addToCart(item:Item){
    let items:Item[] = this.item$.getValue();
    items.push(item);
    this.item$.next(items);
    localStorage.setItem('cart',JSON.stringify(items));
  }

  removeItem(id:string){
    // @ts-ignore
    let items = JSON.parse(localStorage.getItem('cart')) as Item[] ;
    const filteredItem = items.filter(item=>item.id !== id);
    this.item$.next(filteredItem);
    localStorage.setItem('cart',JSON.stringify(filteredItem));
  }

  getItem$(){
    return this.item$.asObservable();
  }
}
