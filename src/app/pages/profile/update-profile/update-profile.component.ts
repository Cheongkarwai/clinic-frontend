import {Component, EventEmitter, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { ToastsContainer } from 'src/app/components/toast/toasts-container.component';
import { UserCredentials } from 'src/app/core/user/user-credentials.model';
import { UserService } from 'src/app/core/user/user.service';
import Swal from 'sweetalert2';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UploadFileComponent} from "../../../components/upload-file/upload-file.component";
import {FileService} from "../../../core/file/file.service";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  //icon
  faPenSquare = faPenSquare;

  isEditing: boolean = false;
  isSavedProfile: boolean = false;

  //user profile form
  userProfileForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(10)]],
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    addressLine1: [''],
    addressLine2: [''],
    city: [''],
    zipcode: [''],

  });

  files:File [] = [];


  //toast
  toastTitle: string = '';
  toastMessage: string = '';
  @ViewChild(ToastsContainer) toast?: ToastsContainer;


  constructor(private userService: UserService,private fileService:FileService, private fb: FormBuilder,private modalService:NgbModal) { }

  ngOnInit(): void {

    this.userService.findProfileByUsername("020828140563")
      .pipe(map((data: any) => data['data']['user']))
      .subscribe(res => {
        this.userProfileForm.setValue({
          username: res['username'],
          fullName: res['userProfile']['fullName'],
          email: res['userProfile']['email'],
          addressLine1: res['userProfile']['addressLine1'],
          addressLine2: res['userProfile']['addressLine2'],
          city: res['userProfile']['city'],
          zipcode: res['userProfile']['zipcode']
        });
      });
    this.userProfileForm.disable();
  }

  toggleEditProfile(event: any) {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.userProfileForm.enable();
    }
  }

  editProfile(event: any) {
    if (this.userProfileForm.invalid) {
      this.userProfileForm.markAllAsTouched();
      Swal.fire({
        title: 'Unable to proceed',
        text: 'Please fill in the required fields',
        icon: 'error'
      })
    } else {

      Swal.fire({
        title: 'Update profile information',
        text: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Update profile",
      }).then(result => {
        if (result.isConfirmed) {
          this.isEditing = !this.isEditing;
          this.userProfileForm.disable();
          const credential: UserCredentials = JSON.parse(sessionStorage.getItem('credentials') as string);
          this.userService.updateProfileByUsername(credential['username'], this.userProfileForm.value)
            .pipe(map((res: any) => res['data']['updateProfile']))
            .subscribe(res => {
              this.userProfileForm.setValue({
                username: credential['username'],
                fullName: res['fullName'],
                email: res['email'],
                addressLine1: res['addressLine1'],
                addressLine2: res['addressLine2'],
                city: res['city'],
                zipcode: res['zipcode']
              });
              Swal.fire({
                title:"Success",
                text:'Profile is updated',
                icon:'success'
              });
            });
        }
      })
    }
  }

  openUploadPictureDialog(uploadPicture:any){
    this.modalService.open(uploadPicture).result.then(
      (result)=>{

      },
      (reason)=>{

      }
    )
  }

  handleClickUploadFile(event:any){
    this.fileService.uploadFile(this.files).subscribe(res=>console.log(res));
  }

  addFiles(files:File[]){
    this.files = files;
  }



  get username() {
    return this.userProfileForm.get('username');
  }

  get fullName() {
    return this.userProfileForm.get('fullName');
  }

  get email() {
    return this.userProfileForm.get('email');
  }

}
