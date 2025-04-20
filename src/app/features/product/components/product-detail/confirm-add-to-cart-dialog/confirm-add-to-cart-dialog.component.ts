import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
    selector: 'app-confirm-add-to-cart-dialog',
  imports: [FormsModule, ReactiveFormsModule],
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
    this.router.navigateByUrl('/pages/checkout/cart');
  }
}
