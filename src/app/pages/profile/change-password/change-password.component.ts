import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentials } from 'src/app/core/user/user-credentials.model';
import { UserService } from 'src/app/core/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup = this.fb.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', [Validators.required]]
  }, {
    validator: this.passwordMatchValidator
  })

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.getRawValue() === form.get('confirmPassword')?.getRawValue() ? null : { mismatch: true };
  }

  changePassword() {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      Swal.fire({
        title:'Unable to proceed',
        text:'Please fill in the required fields',
        icon:'error'
      })
    } else {
      Swal.fire({
        title: 'Change Password',
        text: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,     
        confirmButtonText: "Change Password",   
      }).then(result=>{

        if(result.isConfirmed){
          const credentials: UserCredentials = JSON.parse(sessionStorage.getItem('credentials') as string);
          this.userService.changePasswordByUsername(credentials.username, this.newPassword?.getRawValue())
            .subscribe({
              next: ({ data }) => {
                Swal.fire({
                  title:'Success',
                  text:'Password has been changed',
                  icon:'success'
                }).then(result=>location.reload());

              }, error: err => Swal.fire({
                title: 'Unable to process',
                text: err,
                icon: 'error'
              })
            });
        }
      });
    }


  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }
}
