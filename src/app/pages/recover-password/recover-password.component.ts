import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery-password',
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


  constructor(private fb:FormBuilder,private userService:UserService,private activatedRoute:ActivatedRoute,private router:Router) { }

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
      const username = this.activatedRoute.snapshot.queryParamMap.get('username');
      this.userService.changePasswordByUsername(username ? username : '',this.newPassword?.getRawValue())
            .subscribe({next:res=>{
              Swal.fire({
                title:'Success',
                text:'You have changed your password',
                icon:'success'
              }).then(result=>{
                this.router.navigateByUrl('/login')
              })
            },
            error:err=>Swal.fire({
              title:'Unable to proceed',
              text:err,
              icon:'error'
            })
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
