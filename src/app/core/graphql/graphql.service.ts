import { Injectable } from "@angular/core";
import { Apollo, TypedDocumentNode } from "apollo-angular";
import { MutationOptions } from "apollo-angular/types";

@Injectable({
    providedIn:'root'
})
export class GraphQLService{

    constructor(private apollo:Apollo){}

    mutate(request:TypedDocumentNode<unknown,unknown>,variables?:any){
        return this.apollo.mutate({
            mutation:request,
            variables:variables
        })
    }
}