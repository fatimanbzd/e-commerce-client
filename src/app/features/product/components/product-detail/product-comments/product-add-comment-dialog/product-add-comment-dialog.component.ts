import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { ProductCommentService } from '../../../../services/product-comment.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IProductCommentAddModel } from '../../../../interfaces/product-comment.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Utilities } from '@core/Utils/utilities';

@Component({
  selector: 'app-product-add-comment-dialog',
  imports: [NgbRating, ReactiveFormsModule, NgClass, FormsModule],
  templateUrl: './product-add-comment-dialog.component.html',
  styleUrl: './product-add-comment-dialog.component.scss',
})
export class ProductAddCommentDialogComponent implements OnInit {
  form!: FormGroup;
  disadvantage!: string;
  maxItems = 5;
  @Input() pi!: number;
  @Input() productName!: string;

  constructor(
    private productCommentService: ProductCommentService,
    private fb: FormBuilder,
    private destroyRef: DestroyRef,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  get disadvantages(): FormArray {
    return this.form.get('disadvantages') as FormArray;
  }

  get advantages(): FormArray {
    return this.form.get('advantages') as FormArray;
  }

  initForm() {
    this.form = this.fb.group({
      rating: [0, Validators.required],
      title: [null, Validators.required],
      body: [null, Validators.required],
      advantages: this.fb.array([]),
      advantage: [''],
      disadvantages: this.fb.array([]),
      disadvantage: [''],
      registerAsAnonymous: false,
    });
  }

  addAdvantage() {
    const advantageControl = this.form.get('advantage');
    if (!advantageControl?.value) return;
    const newValue = advantageControl?.value.trim();
    if (newValue && this.advantages.length <= this.maxItems) {
      this.advantages.push(this.fb.control(newValue));
      advantageControl?.reset();
    } else this.toastr.warning('تعداد نقاط ضعف تکمیل شده است!');
  }

  addDisAdvantage() {
    const disadvantageControl = this.form.get('disadvantage');
    if (!disadvantageControl?.value) return;
    const newValue = disadvantageControl?.value.trim();
    if (newValue && this.disadvantages.length <= this.maxItems) {
      this.disadvantages.push(this.fb.control(newValue));
      disadvantageControl?.reset();
    } else this.toastr.warning('تعداد نقاط ضعف تکمیل شده است!');
  }

  removeDisAdvantage(index: number) {
    this.disadvantages.removeAt(index);
  }

  removeAdvantage(index: number) {
    this.advantages.removeAt(index);
  }

  submit(form: any) {
    if (form.invalid) {
      Utilities.checkValidation(form);
      return;
    }

    if (this.form.value.rating === 0) {
      this.toastr.error('لطفا امتیاز خود را ثبت کنید.');
      return;
    }
    const value = form.value;
    const model: IProductCommentAddModel = {
      rating: value.rating,
      title: value.title,
      body: value.body,
      advantages: value.advantages,
      disadvantages: value.disadvantages,
      registerAsAnonymous: value.registerAsAnonymous,
    };

    this.productCommentService
      .add(model, this.pi)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastr.success('نظر شما با موفقیت ثبت شد.');
          this.activeModal.dismiss();
        },
      });
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
