import { Item } from "./item.model";

export interface OrderForm{
    subtotal:number;
    items:Item[];
    buyer:string;
}