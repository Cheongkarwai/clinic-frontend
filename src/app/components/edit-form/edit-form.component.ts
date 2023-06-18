import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from 'src/app/core/product/product.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  productForm = this.formBuilder.group({
    name:[''],
    price:[0],
    description:['']
  })

  @Input() product:Product | undefined;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.productForm.patchValue({
      name:this.product?.name,
      price:this.product?.price,
      description:this.product?.description
    })
   
  }

  get name(){return this.productForm.controls.name;}

  get description(){ return this.productForm.controls.description; }

  get price(){return this.productForm.controls.price;}

}
