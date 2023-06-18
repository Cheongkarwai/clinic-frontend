import { Component, OnInit } from '@angular/core';
import { faUser,faKey,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //fontawesome icon
  faUser = faUser;
  faKey = faKey;
  faArrowRightFromBracket = faArrowRightFromBracket;

  isEditing:boolean = false;
  isSavedProfile:boolean = false;

  //current active tab
  currentActiveTab:string = 'Edit-profile';

  constructor() { }

  ngOnInit(): void {
  }

  toggleEditProfile(event:any){
    this.isEditing = !this.isEditing;
  }

  editProfile(event:any){
    this.isEditing = !this.isEditing;
    this.isSavedProfile = true;

    setTimeout(()=>{
      this.isSavedProfile = false;
    },3000);
  }

  changeUserPassword(event:any){}

  changeUserProfile(event:any){}

  logout(event:any){}
  
  switchProfileActiveTab(activeTab:string){
    this.currentActiveTab = activeTab;
  }
}
