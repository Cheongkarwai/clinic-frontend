import { Component, OnInit, ViewChild ,LOCALE_ID, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsContainer } from 'src/app/components/toast/toasts-container.component';
import { UserCredentials } from 'src/app/core/user/user-credentials.model';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm:FormGroup = this.fb.group({
    newPassword:['',Validators.required],
    confirmPassword:['',[Validators.required]]
  },{
    validator:this.passwordMatchValidator
  })

  toastTitle:string = 'Notification';
  toastMessage:string = '';

  @ViewChild(ToastsContainer) toast?:ToastsContainer;

  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit(): void {
  }

  passwordMatchValidator(form:FormGroup){
    return  form.get('newPassword')?.getRawValue() === form.get('confirmPassword') ?.getRawValue() ? null : {mismatch:true};
  }

  changePassword(){
    if(this.changePasswordForm.invalid){
      this.changePasswordForm.markAllAsTouched();
    }else{
      const credentials:UserCredentials = JSON.parse(sessionStorage.getItem('credentials') as string);
      console.log(credentials.username);
      this.userService.changePasswordByUsername(credentials.username,this.newPassword?.getRawValue())
            .subscribe(({data})=>{
              this.toastMessage = "Password has been successfully changed";
              this.toast?.show();
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
