import { Component, OnInit } from '@angular/core';
import { faBuildingColumns, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { BrainTree } from 'src/app/core/payment/braintree';
import { Product } from 'src/app/core/product/product.model';
import * as braintree from 'braintree-web';
import { HttpClient } from '@angular/common/http';
import { BraintreeService } from 'src/app/core/payment/braintree.service';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { GraphQLService } from 'src/app/core/graphql/graphql.service';
import { gql } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject ,Observable, firstValueFrom} from 'rxjs';
import { Router } from '@angular/router';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  faCreditCard = faCreditCard;
  faBuildingColumns = faBuildingColumns;

  products:Product[] = []
  //   [{name:'Cheong1',price:12,description:'LOL',id:'12',is_added_to_cart:true},{name:'Cheong1',price:12,description:'LOL',id:'12',is_added_to_cart:true},
  // {name:'Cheong1',price:12,description:'LOL',id:'12',is_added_to_cart:true}];

  stages:object[] = [{index:0,name:'addressInfo'},{index:1,name:'selectPayment'},{index:2,name:'proceedPayment'},{index:3,name:'completed'}];
  selectedStage:any = this.stages[0];

  paymentMethods:any[] = [{method:'Credit Card/Debit Card',id:1},{method:'Bank',id:2},{method:'Touch & Go E-wallet',id:3}]
  selectedPaymentMethod = this.paymentMethods[0];

  //
  isButtonLoading = false;
  isOrderCompleted!:Observable<boolean>;
  isPaymentCompleted!:Observable<boolean>;

  basicInfoForm!:FormGroup;
  isLinear = true;

  paymentMethodForm!:FormGroup;
  payPalConfig ? : IPayPalConfig;


  constructor(private graphQLService:GraphQLService,private brainTree:BrainTree,private fb:FormBuilder,private router:Router,) { }

  ngOnInit(): void {
    this.isOrderCompleted = this.brainTree.orderCompleted;
    this.isPaymentCompleted = this.brainTree.paymentCompleted;
    this.isOrderCompleted.subscribe(res=>{
      if(res){
        this.switchStage();
        setTimeout(()=>{
          this.router.navigateByUrl('/home');
        },1000);
      }
    });
    this.paymentMethodForm = this.fb.group({
      paymentMethod:[]
    });
    this.basicInfoForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      contactNo:['',Validators.required],
      address:this.fb.group({
        addressLine1:['',Validators.required],
        addressLine2:['',Validators.required],
        city:['',Validators.required],
        // state:['',Validators.required],
        zipcode:['',Validators.required]
      })
    });
    this.initPaypalConfig();
  }

  async handleClickNext(){
    // this.isButtonLoading = true;
    // await new Promise<void>((resolve)=>setTimeout(()=>{
    //   this.isButtonLoading = false;
    //   resolve();
    // },2000));
    //
    const token = await lastValueFrom(this.graphQLService.mutate(gql `
    mutation{
        generateClientToken
    }`));
    const {data}:any = token;
    const clientToken = JSON.parse(data['generateClientToken'])['data']['createClientToken']['clientToken'];
    this.brainTree.createBraintreeUI(clientToken);
    this.brainTree.processingPayment(this.basicInfoForm.value,this.calculateTotal());
    //
    // await this.checkout(this.selectedStage['index'],clientToken);

    this.basicInfoForm.markAllAsTouched();
  }
  async checkout(stage:number,token:string){
    switch(stage){
      case 0:
        if(this.basicInfoForm.invalid){
          this.basicInfoForm.markAllAsTouched();
          return;
        }
        this.brainTree.createBraintreeUI(token);
        this.switchStage();
      break;
      case 1:
      this.brainTree.processingPayment(this.basicInfoForm.value,this.calculateTotal());
      this.isPaymentCompleted.subscribe(res=>res ?  this.switchStage() : null);
      break;
    }
  }

  calculateTotal(){
    return this.products.map((e:Product)=>e.price).reduce((prev,curr)=> prev + curr);
  }

  switchStage(){
    if(++this.selectedStage['index'] < this.stages.length){
      this.selectedStage = this.stages[this.selectedStage['index']];
    }
  }

  changePaymentMethod(){
    switch(this.selectedPaymentMethod.id){
      case 1:
        this.initPaypalConfig();
        break;

      case 2:

        break;

      case 3:


    }
  }

  private initPaypalConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => < ICreateOrderRequest > {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        layout: 'horizontal',
        color:'black'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details:any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        //this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        //this.showCancel = true;

      },
      onError: err => {
        console.log('OnError', err);
        //this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        //this.resetStatus();
      }
    };
  }

  get email(){
    return this.basicInfoForm.get('email');
  }

  get contactNo(){
    return this.basicInfoForm.get('contactNo');
  }

  get addressLine1(){
    return this.basicInfoForm.get('address.addressLine1');
  }

  get addressLine2(){
    return this.basicInfoForm.get('address.addressLine2');
  }

  get city(){
    return this.basicInfoForm.get('address.city');
  }

  get zipcode(){
    return this.basicInfoForm.get('address.zipcode');
  }


}
