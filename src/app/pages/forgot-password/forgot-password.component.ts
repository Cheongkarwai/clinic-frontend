import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailAddress:string = '';
  isSent:boolean = false;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  verifyEmail(){

    console.log(this.emailAddress);
    this.userService.sendForgotPasswordEmailByEmail(this.emailAddress).subscribe(({data}:any)=>{
      if(data?.['sendForgotPasswordEmail']){
        this.isSent = data?.['sendForgotPasswordEmail'];
      }
    })
  }
}
