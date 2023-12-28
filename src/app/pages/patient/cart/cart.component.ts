import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/product/product.model';
import {CartService} from "../../../core/cart/cart.service";
import {map, Observable} from "rxjs";
import {Item} from "../../../core/cart/item.interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  products:Product[] = [{name:'Cheong1',price:12,description:'LOL',id:'12',is_added_to_cart:true,availableQuantity:12},{name:'Cheong1',price:12,description:'LOL',id:'12',is_added_to_cart:true,availableQuantity:1}]

  item$!:Observable<Item[]>;
  total$!:Observable<number>;

  constructor(private router:Router,private cartService:CartService) { }

  ngOnInit(): void {
    this.item$  = this.cartService.getItem$();
    this.total$ = this.cartService.getItem$().pipe(map(items=>items.map(item=>item.price).reduce((acc,curr)=>acc+curr)));
  }

  handleClickCheckout(){
      this.router.navigateByUrl('checkout');
  }

  removeItem(id: string) {

    this.cartService.removeItem(id);
  }
}
