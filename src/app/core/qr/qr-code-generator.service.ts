import { HttpClient,HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class QrCodeGenerator{

    constructor(private httpClient:HttpClient){}

    generateQrCode(params:any){
        return this.httpClient.get('https://chart.googleapis.com/chart',{responseType:'blob',params:params});
    }

}