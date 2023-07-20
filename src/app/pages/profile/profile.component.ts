import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser,faKey,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Observable, map, tap } from 'rxjs';
import { UserProfile } from 'src/app/core/user/user-profile.model';
import { UserService } from 'src/app/core/user/user.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/core/user/user-credentials.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  //fontawesome icon
  faUser = faUser;
  faKey = faKey;
  faArrowRightFromBracket = faArrowRightFromBracket;

  //current active tab
  activeTabIndex:number = 0;

  constructor(private router:Router) { }

  logout(event:any){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
  
  switchProfileActiveTab(index:number){
    this.activeTabIndex = index;
  }

}
