import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faCloudArrowUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files:File [] = [];

  faCloudArrowUp = faCloudArrowUp;

  isUploading:boolean = false;

  @Output("uploadFile") uploadFile = new EventEmitter<File[]>();
  constructor() { }

  ngOnInit(): void {
  }

  async onDrop(event:any){
     event.stopPropagation();
     event.preventDefault();

     this.addFile(event.dataTransfer.files);
     await this.waitUploadingAnimation();

  }

  async waitUploadingAnimation(){
    this.turnOnUploadAnimation();
    await this.wait(3000);
    this.turnOffUploadAnimation();
  }

  addFile(files:File[]){

    for(let file of files){
      this.files.push(file);
    }

    this.uploadFile.emit(this.files);
  }

  wait(ms:number){
    return new Promise(resolve=>
      setTimeout(resolve
      , ms)
    );
  }

  turnOnUploadAnimation(){
    this.isUploading = true;
  }

  turnOffUploadAnimation(){
    this.isUploading = false;
  }

  onDragLeave(event:any){
  }

  onDragOver(event:any){
    event.preventDefault();
  }

}
