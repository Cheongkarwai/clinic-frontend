import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, map, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required],
  });

  isAuthenticated:boolean = this.authService.isLoggedIn();

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {

    history.pushState(null, '');

  fromEvent(window, 'popstate').subscribe((_) => {
    history.pushState(null, '');

  });
  }

  handleClickLogin(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }
    else{
      this.requestLogin();
    }
  }

  requestLogin(){
    this.authService.login({username:this.username?.getRawValue(),password:this.password?.getRawValue()})
        .subscribe({next:({data})=>{
          history.pushState(null,'');
          Swal.fire({
            title:'Success Login',
            icon:'success',
            text:'You have successfully login',
          }).then(result=>{
            this.router.navigateByUrl('/chatroom')
            this.authService.saveToken(data['loginUser']);
          });
        },
        error:err=>Swal.fire({
          title:'Failed Login',
          icon:'error',
          text:err['message']})})
  }

  confirm(){

  }

  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
