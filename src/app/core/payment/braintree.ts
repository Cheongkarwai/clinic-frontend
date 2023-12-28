import * as braintree from "braintree-web";
import { GraphQLService } from "../graphql/graphql.service";
import { gql } from "apollo-angular";
import { Injectable } from "@angular/core";
import { CREATE_ORDER,  CREATE_PAYMENT_AND_ORDER, CREATE_TRANSACTION } from "../graphql/graphql.operation";
import { BehaviorSubject, Observable } from "rxjs";
import { Transaction } from "./transaction.interface";
import { UserCredentials } from "../user/user-credentials.model";
import { resultKeyNameFromField } from "@apollo/client/utilities";

@Injectable({
  providedIn:'root'
})
export class BrainTree{

  constructor(private graphQLService:GraphQLService){}

    hostedFieldsInstance!: braintree.HostedFields;
    cardholdersName: string = '';
    private isCreateOrderCompleted:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    private isPaymentCompleted:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    createBraintreeUI(clientToken:string) {
        braintree.client.create({
          authorization: clientToken
        }).then((clientInstance:any) => {
          braintree.hostedFields.create({
            client: clientInstance,
            styles: {
              // Override styles for the hosted fields
            },
    
            // The hosted fields that we will be using
            // NOTE : cardholder's name field is not available in the field options
            // and a separate input field has to be used incase you need it
            fields: {
              number: {
                selector: '#card-number',
                placeholder: '1111 1111 1111 1111'
              },
              cvv: {
                selector: '#cvv',
                placeholder: '111'
              },
              expirationDate: {
                selector: '#expiration-date',
                placeholder: 'MM/YY'
              }
            }
          }).then((hostedFieldsInstance:any) => {
    
            this.hostedFieldsInstance = hostedFieldsInstance;
    
            hostedFieldsInstance.on('focus', (event:any) => {
              const field = event.fields[event.emittedBy];
              const label = this.findLabel(field);
              label?.classList.remove('filled'); // added and removed css classes
              // can add custom code for custom validations here
            });
    
            hostedFieldsInstance.on('blur', (event:any) => {
              const field = event.fields[event.emittedBy];
              const label = this.findLabel(field); // fetched label to apply custom validations
              // can add custom code for custom validations here
            });
    
            hostedFieldsInstance.on('empty', (event:any) => {
              const field = event.fields[event.emittedBy];
              // can add custom code for custom validations here
            });
    
            hostedFieldsInstance.on('validityChange', (event:any) => {
              const field = event.fields[event.emittedBy];
              const label = this.findLabel(field);
              if (field.isPotentiallyValid) { // applying custom css and validations
                label?.classList.remove('invalid');
              } else {
                label?.classList.add('invalid');
              }
              // can add custom code for custom validations here
            });
          });
        });
      }
    
      // Tokenize the collected details so that they can be sent to your server
      // called from the html when the 'Pay' button is clicked
      processingPayment(contactDetails:any,totalAmount:number) {
        this.hostedFieldsInstance.tokenize({cardholderName: this.cardholdersName}).then((payload:any) => {
          this.graphQLService.mutate(CREATE_TRANSACTION,{paymentId:payload.nonce,amount:totalAmount}).subscribe(({data}:any)=>{
            this.isPaymentCompleted.next(true);
            this.isCreateOrderCompleted.next(false);
            const transaction:Transaction = JSON.parse(data['createTransaction'])['data']['chargePaymentMethod']['transaction'] as Transaction;
            this.createPaymentAndOrder(transaction,contactDetails,totalAmount);
          })
          // submit payload.nonce to the server from here
        }).catch((error:any) => {
          console.log(error);
          // perform custom validation here or log errors
        });
      }

      createPaymentAndOrder(transaction:Transaction,contactDetails:any,totalAmount:number){
        const userCredentials:UserCredentials = JSON.parse(sessionStorage.getItem('credentials') as string);

        console.log(contactDetails);
        const orderVariables = {
          tax:10,
          subtotal:totalAmount,
          username:userCredentials.username,
          paymentStatus:transaction.status,
          transactionId:transaction.id,
          contactDetails:contactDetails
        };

        const paymentVariables = {
          transactionId:transaction.id,
          paymentMethod:'creditcard'
        }

        this.graphQLService.mutate(CREATE_PAYMENT_AND_ORDER,{paymentInput:paymentVariables,orderInput:orderVariables})
          .subscribe(res=>{
            setTimeout(()=>{
              this.isCreateOrderCompleted.next(true);
            },1000);
        })
      }
    
      // Fetches the label element for the corresponding field
      findLabel(field: any) {
        return document.querySelector('.hosted-field--label[for="' + field.container.id + '"]');
      }

      get orderCompleted():Observable<boolean>{
        return this.isCreateOrderCompleted.asObservable();
      }

      get paymentCompleted():Observable<boolean>{
        return this.isPaymentCompleted.asObservable();
      }
}