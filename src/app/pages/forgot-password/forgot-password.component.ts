import { Component, OnInit } from '@angular/core';
import { MdbErrorDirective } from 'angular-bootstrap-md';
import { Observable, interval, map, takeWhile, tap, timer } from 'rxjs';
import { UserService } from 'src/app/core/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailAddress: string = '';
  isSent: boolean = false;

  $timer: Observable<any> = new Observable<any>();
  reSend: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  verifyEmail() {

    if (this.emailAddress == null || this.emailAddress == '') {
      Swal.fire({
        title: 'Unable to proceed',
        text: 'Email address is required',
        icon: 'error'
      });
      return;
    }

    this.reSend = false;

    this.userService.sendForgotPasswordEmailByEmail(this.emailAddress).subscribe({
      next:
        (res: any) => {
          if (res.data?.['sendForgotPasswordEmail']) {
            this.isSent = res.data?.['sendForgotPasswordEmail'];
            Swal.fire({
              title: 'Recovery Password',
              text: `Recovery password link has been sent to ${this.emailAddress}`,
              icon: 'success',
            });

            this.$timer = timer(0, 1000).pipe(
              map(n => (10 - n)),
              takeWhile(n => n >= 0),
              tap(null, null, () => this.reSend = true)
            );
          }
        }, error: err => {
          Swal.fire({
            title: 'Error',
            text: err,
            icon: 'error'
          })
        }
    });

  }
}
