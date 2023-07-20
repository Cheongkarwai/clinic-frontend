import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { ToastsContainer } from 'src/app/components/toast/toasts-container.component';
import { UserCredentials } from 'src/app/core/user/user-credentials.model';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

    //icon
    faPenSquare = faPenSquare;

   isEditing:boolean = false;
   isSavedProfile:boolean = false;
 
   //user profile form
   userProfileForm:FormGroup = this.fb.group({
     username:['',[Validators.required,Validators.minLength(10)]],
     fullName:['',Validators.required],
     email:['',[Validators.required,Validators.email]],
     addressLine1:[''],
     addressLine2:[''],
     city:[''],
     zipcode:[''],
 
   });

   //toast
   toastTitle:string = '';
   toastMessage:string = '';
   @ViewChild(ToastsContainer) toast?:ToastsContainer;
   
  constructor(private userService:UserService,private fb:FormBuilder) { }

  ngOnInit(): void {

    this.userService.findProfileByUsername("020828140563")
      .pipe(map((data:any)=>data['data']['user']))
      .subscribe(res=>{
        this.userProfileForm.setValue({
          username:res['username'],
          fullName:res['userProfile']['fullName'],
          email:res['userProfile']['email'],
          addressLine1:res['userProfile']['addressLine1'],
          addressLine2:res['userProfile']['addressLine2'],
          city:res['userProfile']['city'],
          zipcode:res['userProfile']['zipcode']
        });
      });
    this.userProfileForm.disable();
  }

  toggleEditProfile(event:any){
    this.isEditing = !this.isEditing;
    if(this.isEditing){
      this.userProfileForm.enable();
    }
  }

  editProfile(event:any){
    if(this.userProfileForm.invalid){
      this.userProfileForm.markAllAsTouched();
      this.toastMessage = "User profile has failed to update."
      this.toast?.show();
    }else{
      this.isEditing = !this.isEditing;
      this.userProfileForm.disable();
      const credential:UserCredentials = JSON.parse(sessionStorage.getItem('credentials') as string);
      this.userService.updateProfileByUsername(credential['username'],this.userProfileForm.value)
                    .pipe(map((res:any)=>res['data']['updateProfile']))
                    .subscribe(res=>{
                      this.userProfileForm.setValue({
                        username:credential['username'],
                        fullName:res['fullName'],
                        email:res['email'],
                        addressLine1:res['addressLine1'],
                        addressLine2:res['addressLine2'],
                        city:res['city'],
                        zipcode:res['zipcode']
                      });
                      this.toastMessage = "User profile has been successfully updated."
                      this.toast?.show();
                    });
    }
  }

  get username(){
    return this.userProfileForm.get('username');
  }

  get fullName(){
    return this.userProfileForm.get('fullName');
  }

  get email(){
    return this.userProfileForm.get('email');
  }

}
