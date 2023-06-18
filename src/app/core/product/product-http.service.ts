import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject, filter, map } from "rxjs";
import { ProductInfo } from "./product-info.model";
import { createParam } from "../shared/web.function";

@Injectable({
    providedIn:'root'
})
export class ProductService{

    private path:string = 'http://localhost:8080/api/products';
    private products$ = new BehaviorSubject<ProductInfo | null>(null);
    private options;

    constructor(private http:HttpClient){
        this.options = {
            headers:{
                'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMjA4MjgxNDA1NjMiLCJleHAiOjE2ODc2MTIzMDYsImlhdCI6MTY4NTg4NDMwNiwic2NvcGUiOiIifQ._3RgCXo4XMTwSACTW-ujhdLDBubP4sbj890wBFzyxWI'
            },
            params:{},
        }
    }

    createProduct(product:Product):Observable<object>{
        return this.http.post<object>(this.path,product,this.options);
    }

    loadProducts(params:object){
        this.options['params'] = createParam(params);
        this.http.get<ProductInfo>(this.path,this.options)
            .subscribe(res=>this.products$.next(res));
    }

    findProductById(id:string):Observable<Product>{
        return this.http.get<Product>(`${this.path}/${id}`,this.options);
    }

    getProducts$() : Observable<ProductInfo | null> { return this.products$.asObservable();}
}