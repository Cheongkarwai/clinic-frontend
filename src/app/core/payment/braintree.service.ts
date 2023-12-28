import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";

const GET_BRAINTREE_CLIENT_TOKEN = gql `
mutation{
    generateClientToken
}`;

@Injectable({
    providedIn:'root'
})
export class BraintreeService{

    constructor(private apollo:Apollo){}

    getClientToken(){
        return this.apollo.mutate({
            mutation:GET_BRAINTREE_CLIENT_TOKEN
        });
    }
    
}