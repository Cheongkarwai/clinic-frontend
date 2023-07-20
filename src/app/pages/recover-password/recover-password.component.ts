import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  changePasswordForm:FormGroup = this.fb.group({
    newPassword:['',Validators.required],
    confirmPassword:['',[Validators.required]]
  },{
    validator:this.passwordMatchValidator
  })


  constructor(private fb:FormBuilder,private userService:UserService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    console.log(this.activatedRoute.snapshot.queryParamMap.get('username'));
  }

  passwordMatchValidator(form:FormGroup){
    return  form.get('newPassword')?.getRawValue() === form.get('confirmPassword') ?.getRawValue() ? null : {mismatch:true};
  }

  changePassword(){
    if(this.changePasswordForm.invalid){
      this.changePasswordForm.markAllAsTouched();
    }else{
      let email = "cheongkarwai5@gmail.com";
      this.userService.changePasswordByUsername(email,this.newPassword?.getRawValue())
            .subscribe(({data})=>{

            });
    }


  }
  get newPassword(){
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPassword(){
    return this.changePasswordForm.get('confirmPassword');
  }
}
