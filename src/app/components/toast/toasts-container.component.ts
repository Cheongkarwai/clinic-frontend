import { Component, Input, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-toasts',
    template: `
        <div class='position-fixed top-0 end-0 m-2 toast-container' id='toast' *ngIf="!isHidden">
		 <div class='border rounded'>
            <div class="toast-header px-3 py-2">
                <div  class="rounded bg-success border px-1">
                    <fa-icon [icon]="faSolidCheck"></fa-icon>
                </div>
                <strong class="me-auto" i18n>Bootstrap</strong>
                <small>11 mins ago</small>
            </div>
        <div class="toast-body p-3">
        {{body}}
        </div>
    </div>
        </div>
	`,
    styles:['.toast-header{border-bottom:1px solid #dee2e6}','.toast-container{background-color:white;z-index:100px}']
})
export class ToastsContainer{

    @Input() body: string = '';
    @Input() title: string = '';
    isHidden:boolean =  true;
    faSolidCheck = faCheck;

    show(){
        this.isHidden = false;
        setTimeout(()=>{
            this.isHidden = true;
        },3000)
    }
}