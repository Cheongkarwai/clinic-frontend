import { Product } from "./product.model";

export class ProductInfo{
    page!: {
        totalElements:number;
        totalPages:number;
    };
    _embedded!: {
        products:Product[]
    };
    _links!:{
        first:string;
        last:string;
        prev:string;
        next:string;
        self:string;
    };
}