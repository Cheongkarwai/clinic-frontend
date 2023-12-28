import { Component, Input, OnInit } from '@angular/core';
import { faHeart, faPenToSquare, faStar } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/core/product/product.model';

@Component({
  selector: 'app-product-banner',
  templateUrl: './product-banner.component.html',
  styleUrls: ['./product-banner.component.css']
})
export class ProductBannerComponent implements OnInit {

  //icon
  faStar = faStar;
  faHeart = faHeart;
  faPenToSquare = faPenToSquare;

  @Input()
  product:Product = {name:'Cheong',price:12,description:'LOL',id:'12',is_added_to_cart:true,availableQuantity:1};

  constructor() { }

  ngOnInit(): void {
  }

}
