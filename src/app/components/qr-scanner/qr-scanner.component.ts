import { AfterViewInit, Component, OnInit, ViewChild ,Output,EventEmitter} from '@angular/core';
import { BarcodeFormat, Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent implements OnInit,AfterViewInit{

  formats:BarcodeFormat[] = [BarcodeFormat.QR_CODE];
  @ViewChild('scanner') scanner!:ZXingScannerComponent;

  qrResult!:Result;
  selectedDevice!:MediaDeviceInfo;
  availableDevices!:MediaDeviceInfo [];

  hasPermission:boolean = false;

  @Output() scanSuccess:EventEmitter<any> = new EventEmitter<any>(); 

  constructor() { }

  ngOnInit(): void {


  }

  ngAfterViewInit(){
    console.log(this.scanner);
    this.scanner.camerasFound.subscribe((devices:MediaDeviceInfo[])=>{
      this.availableDevices = devices;
      this.selectedDevice = this.availableDevices[0];
      console.log(this.availableDevices);
    })
  }

  onDeviceChange(event:any){
    console.log(event.target.value);
  }

  handleResult(result:any){
    this.scanSuccess.emit(result);
  }

  handlePermission(hasPermission:boolean){
    this.hasPermission = hasPermission;
  }

}
