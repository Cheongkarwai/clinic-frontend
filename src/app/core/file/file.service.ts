import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {UPLOAD_FILE} from "../graphql/graphql.operation";

@Injectable({
  providedIn:'root'
})
export class FileService{

  constructor(private apollo:Apollo) {}

  uploadFile(files:File[]){
    return this.apollo.mutate({
      mutation:UPLOAD_FILE,
      variables:{
        files:files
      },
      context:{
        useMultipart:true
      }
    })
  }
}
