import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberDirective } from '@core/directives/only-number.directive';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-confirm-add-to-cart-dialog',
    imports: [FormsModule, OnlyNumberDirective, ReactiveFormsModule, RouterLink],
    templateUrl: './confirm-add-to-cart-dialog.component.html',
    styleUrl: './confirm-add-to-cart-dialog.component.scss'
})
export class ConfirmAddToCartDialogComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
  ) {}

  ngOnInit() {
    setTimeout(() => this.activeModal.dismiss(), 2000);
  }

  goToCart() {
    this.activeModal.dismiss();
    this.router.navigateByUrl('/pages/content/order/cart');
  }
}
