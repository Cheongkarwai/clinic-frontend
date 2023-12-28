import { Injectable } from "@angular/core";
import { ScannerService } from "./scanner.service";

@Injectable({
    providedIn:'root'
})
export class ZXingScannerService extends ScannerService{

    override handleScanSuccess(result: any): void {
        console.log(result);
    }

}