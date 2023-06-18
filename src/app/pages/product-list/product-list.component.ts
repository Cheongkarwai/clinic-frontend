import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../core/product/product-http.service';
import { Product } from '../../core/product/product.model';
import { ProductInfo } from '../../core/product/product-info.model';
import { FormBuilder } from '@angular/forms';
import {Modal} from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { faPenToSquare,faHeart,faStar } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from '../../core/shared/pagination.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products$ = this.productService.getProducts$();

  editProduct$ = new Observable<Product>();

  //icon
  faPenToSquare = faPenToSquare;
  faHeart = faHeart;
  faStar = faStar;


  //pagination
  page:number = 0;
  size:number = 3;

  params:Pagination = {page:this.page,size:this.size};

  exampleModal:Modal | undefined;

  constructor(private productService:ProductService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.productService.loadProducts(this.params);
    // this.products$ = this.productService.getProducts$();
    // this.products$.subscribe(res=>console.log(res));
  }

  saveProduct(event:any){
    // const productData:Product = {
    //   name:this.name.getRawValue(),
    //   description:this.description.getRawValue(),
    //   price:this.price.getRawValue()
    // };

    // this.productService.createProduct(productData).subscribe(res=>{
    //   this.productService.loadProducts(this.params);
    //   this.products$ = this.productService.getProducts$();
    // });
  }

  getCurrentPage(page:number){
    this.params['page'] = page;
    this.productService.loadProducts(this.params);
  }


  openModal(){
    this.exampleModal = new bootstrap.Modal(document.getElementById('exampleModal') as HTMLElement,{});
    this.exampleModal?.show();
  }

  closeModal(event:any){
    this.exampleModal?.hide();
  }

  editProduct(id:string){
    this.exampleModal = new bootstrap.Modal(document.getElementById('exampleModal') as HTMLElement,{});
    this.exampleModal?.show();
    this.editProduct$ = this.productService.findProductById(id);
  }
}
