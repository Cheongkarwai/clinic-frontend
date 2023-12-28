import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../../core/product/product.model";
import {ProductService} from "../../../../core/product/product-http.service";
import {filter, map, Observable} from "rxjs";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product$!:Observable<Product | undefined>;
  currentId!:string;
  quantity:number = 0;

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private productService:ProductService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res=>this.currentId = res['id']);
    this.findProductById(this.currentId);
  }

  findProductById(id:string){
    this.productService.findProductById(id);
    this.product$ = this.productService.getProduct$();
  }

  decreaseQuantity(number: number) {
    if(this.quantity !== 0){
      this.quantity = this.quantity - number;
    }
  }

  increaseQuantity(number:number){

    this.quantity = this.quantity + number;
  }

}
