import { HttpBackend } from '@angular/common/http';
import { Component, OnInit ,OnDestroy} from '@angular/core';
import { HttpService } from './http.service';
import { UserHttpService } from './core/user/user-http.service';
import { Observable, map, filter, every, BehaviorSubject,Subject,takeUntil } from 'rxjs';
import { User } from './core/user/user.model';
import { UserInfo } from './core/user/user-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit ,OnDestroy{
  title = 'clinic';

  // users$:Observable<User[]> = this.userHttp
  //                                 .findAllUser({headers:{'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMjA4MjgxNDA1NjMiLCJleHAiOjE2ODc2MTIzMDYsImlhdCI6MTY4NTg4NDMwNiwic2NvcGUiOiIifQ._3RgCXo4XMTwSACTW-ujhdLDBubP4sbj890wBFzyxWI'}})
  //                                 .pipe(map(data=>this.extractUser(data)));
  // filteredUsers$:Observable<User[]> = this.userHttp
  //                                           .findAllUser({headers:{'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMjA4MjgxNDA1NjMiLCJleHAiOjE2ODc2MTIzMDYsImlhdCI6MTY4NTg4NDMwNiwic2NvcGUiOiIifQ._3RgCXo4XMTwSACTW-ujhdLDBubP4sbj890wBFzyxWI'}})
  //                                           .pipe(map(users=>this.extractUser(users).filter(e=>e.username === 'John')));

  userInfo$ = new BehaviorSubject<UserInfo | null>(null);

  userInfo:UserInfo | null = new UserInfo();

  unsubscribe:Subject<void> = new Subject<void>();

  constructor(private userHttp: UserHttpService) {}

  ngOnInit(): void {
    this.userHttp.findUsers();
    //subscribed
    this.userHttp.getUsers$.subscribe(res=>this.userInfo = res);
    console.log(this.userInfo);
  }

  pressMe() {
    // this.userHttp
    //   .findUsers()
    //   // .pipe(map(users=>this.extractUser(users).filter(e=>e.username === 'John')))
    //   .subscribe((res) => this.userInfo$.next(res));
  }

  handleClickOnPage(page: number) {
    console.log(page);
  }

  handleBrowsePage(link: any) {
    //console.log(next);
    if (link) {
      this.userHttp
        .findUsersByLink(link['href'])
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((res) => this.userInfo$.next(res));
    }
  }

  findUser() {
    // this.users$ =  this.userHttp.findAllUser({headers:{'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMjA4MjgxNDA1NjMiLCJleHAiOjE2ODc2MTIzMDYsImlhdCI6MTY4NTg4NDMwNiwic2NvcGUiOiIifQ._3RgCXo4XMTwSACTW-ujhdLDBubP4sbj890wBFzyxWI'}})
    // .pipe(map(data=>this.extractUser(data)));
  }

  extractUser(data: UserInfo): User[] {
    return data['_embedded']?.['users'];
  }

  createRange(number: any) {
    // return new Array(number);
    return new Array(number).fill(0).map((n, index) => index + 1);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
