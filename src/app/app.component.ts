import {Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingComponent} from './shared/components/loading/loading.component';
import {Subject, takeUntil} from 'rxjs';
import {AuthService} from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit, OnDestroy {
  title = 'MehrSepand.QLand.Client.UI';
  isLoggedIn = false;
  private readonly _destroy = new Subject<void>();

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.authService
        .currentUser()
        .pipe(takeUntil(this._destroy))
        .subscribe((user) => this.authService.doUpdateUser(user));
    }
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
