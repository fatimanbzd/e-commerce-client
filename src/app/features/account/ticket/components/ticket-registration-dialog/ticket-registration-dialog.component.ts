import { Component, DestroyRef, OnInit } from '@angular/core';
import { NgbActiveModal, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { TicketService } from '../../services/ticket.service';
import { PriorityTicketLabel } from '../../enums/priority-ticket.enum';
import { ToastrService } from 'ngx-toastr';
import {EnumConvertorUtils} from '../../../../../shared/Utils/EnumConvertoModel';
import {Utilities} from '../../../../../shared/Utils/utilities';

@Component({
  selector: 'app-ticket-registration-dialog',
  imports: [NgbTooltip, ReactiveFormsModule, NgClass],
  templateUrl: './ticket-registration-dialog.component.html',
  styleUrl: './ticket-registration-dialog.component.scss',
})
export class TicketRegistrationDialogComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
  uploading = false;
  selectedFile: File | null = null;

  PriorityTicketList = EnumConvertorUtils.enumToListModel(PriorityTicketLabel);

  constructor(
    private _activeModal: NgbActiveModal,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private destroyRef: DestroyRef,
    private toaster: ToastrService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      title: [null, Validators.required],
      priority: [null],
      body: [null, Validators.required],
      file: [null],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      Utilities.checkValidation(this.form);
      return;
    }

    const formData = new FormData();

    Object.keys(this.form.controls).forEach((key) => {
      if (key === 'file' && this.selectedFile) {
        formData.append(key, this.selectedFile);
      } else {
        formData.append(key, this.form.get(key)?.value || '');
      }
    });

    this.uploading = true;
    this.ticketService
      .add(formData)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.uploading = false;
          this.submitted = false;
        }),
      )
      .subscribe({
        next: () => {
          this.activeModal.close(true);
          this.ticketService.setTicketUpdated();
          this.toaster.success('تیکت با موفقیت ثبت شد.');
        },
      });
  }
}
