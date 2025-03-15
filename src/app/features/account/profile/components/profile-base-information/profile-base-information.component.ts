import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../../../auth/services/auth.service';
import {Subject, takeUntil} from 'rxjs';
import {IUserModel} from '../../../../../auth/interfaces/user.model';

@Component({
    selector: 'app-profile-base-information',
    templateUrl: './profile-base-information.component.html',
    styleUrl: './profile-base-information.component.scss'
})
export class ProfileBaseInformationComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<void>();
  user: IUserModel | null = null;

  constructor(private authService: AuthService) {
    this.authService._profileUpdated$
      .pipe(takeUntil(this._destroy))
      .subscribe((updated) => {
        if (updated) this.user = this.authService.getUserAuthenticated();
      });
  }

  ngOnInit() {
    this.user = this.authService.getUserAuthenticated();
    if (this.user) {
      this.user.name = this.user?.name ? this.user?.name : 'کاربر';
      this.user.family = this.user?.family ? this.user?.family : 'مهمان';
    }
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
