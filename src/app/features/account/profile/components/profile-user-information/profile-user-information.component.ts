import {Component, EventEmitter, OnDestroy, OnInit, Output,} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../auth/services/auth.service';
import {IUserModel} from '../../../../../auth/interfaces/user.model';

@Component({
    selector: 'app-profile-user-information',
  imports: [],
    templateUrl: './profile-user-information.component.html',
    styleUrl: './profile-user-information.component.scss'
})
export class ProfileUserInformationComponent implements OnInit, OnDestroy {
  user: IUserModel | null = null;
  @Output() editUserInfo = new EventEmitter<boolean>();
  private _destroy = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService._profileUpdated$
      .pipe(takeUntil(this._destroy))
      .subscribe((updated) => {
        if (updated) this.user = this.authService.getUserAuthenticated();
      });
  }

  ngOnInit() {
    this.user = this.authService.getUserAuthenticated();
  }

  goToUpdateUser() {
    this.router.navigate(['/pages/dashboard/update-profile']);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
