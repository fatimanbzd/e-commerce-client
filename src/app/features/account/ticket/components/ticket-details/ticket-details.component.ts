import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ITicketDetailsModel } from '../../interfaces/ticket-details.model';
import { TicketStatusLabel } from '../../enums/status-ticket.enum';
import { PriorityTicketLabel } from '../../enums/priority-ticket.enum';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import {PersianDatePipe} from '../../../../../shared/pipes/persian-date.pipe';
import {EnumLabelPipe} from '../../../../../shared/pipes/enum-label.pipe';
import {RelativeTimePipe} from '../../../../../shared/pipes/relative-time.pipe';
import {Utilities} from '../../../../../shared/Utils/utilities';
import {downloadFileHelper} from '../../../../../shared/Utils/downloadFileHeper';


@Component({
  selector: 'app-ticket-details',
  imports: [
    PersianDatePipe,
    EnumLabelPipe,
    NgClass,
    ReactiveFormsModule,
    RelativeTimePipe,
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent implements OnInit {
  ticketId: number | undefined;
  data!: ITicketDetailsModel;

  form!: FormGroup;
  submitted: boolean = false;
  uploading = false;
  selectedFile: File[] | null = null;

  protected readonly PriorityTicketLabel = PriorityTicketLabel;
  protected readonly ticketStatusLabel = TicketStatusLabel;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor(
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
    private destroyRef: DestroyRef,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.ticketId = this.activatedRoute.snapshot.params['ticketId'];
    this.loadData();
    this.initForm();
  }

  scrollToBottom(): void {
    const container = this.scrollContainer?.nativeElement;
    if (container) container.scrollTop = container.scrollHeight;
  }

  initForm() {
    this.form = this.fb.group({
      Body: [null],
      file: [null],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = Array.from(input.files);
      this.send();
    } else this.selectedFile = null;
  }

  loadData() {
    if (this.ticketId) this.getTicketDetails(this.ticketId);
  }

  getTicketDetails(ticketId: number) {
    return this.ticketService
      .ticketDetails(ticketId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        data.items = data.items.sort(
          (a, b) =>
            new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
        );
        this.data = data;
        setTimeout(() => this.scrollToBottom(), 50);
      });
  }

  download(fileId: number) {
    this.ticketService
      .download(fileId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((file) => {
        downloadFileHelper(file);
      });
  }

  send() {
    this.submitted = true;
    if (this.form.invalid) {
      Utilities.checkValidation(this.form);
      return;
    }

    const formData = new FormData();
    Object.keys(this.form.controls).forEach((key) => {
      if (key === 'file' && this.selectedFile) {
        formData.append(key, this.selectedFile[0]);
      } else {
        formData.append(key, this.form.get(key)?.value || '');
      }
    });

    this.uploading = true;
    this.ticketService
      .reply(this.data.ticketId, formData)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.uploading = false;
          this.submitted = false;
          this.selectedFile = null;
        }),
      )
      .subscribe({
        next: () => {
          this.ticketService.setTicketUpdated();
          this.loadData();
          this.form.reset();
          setTimeout(() => this.scrollToBottom(), 50);
        },
      });
  }
}
