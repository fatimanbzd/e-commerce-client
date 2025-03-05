import {Component, DestroyRef, OnInit} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {IAllLocationResponseModel} from '../../interfaces/location-response.model';
import {LocationUpdateDialogComponent} from '../location-update-dialog/location-update-dialog.component';
import {NgbModal, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmationDialogComponent} from '@core/components/confirmation-dialog/confirmation-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-location-list',
  imports: [NgbTooltip, FormsModule],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss'
})
export class LocationListComponent implements OnInit {
  locationList: IAllLocationResponseModel[] = [];

  constructor(
    private locationService: LocationService,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private destroyRef: DestroyRef
  ) {
    this.locationService.locationUpdated$
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.getList());
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.locationService
      .locations()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loc) => (this.locationList = loc));
  }

  openEditModel(id: number) {
    const modalRef = this.modalService.open(LocationUpdateDialogComponent);
    modalRef.componentInstance.id = id;
  }

  openRemoveModel(id: number) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent);
    modalRef.componentInstance.title = 'حذف آدرس';
    modalRef.componentInstance.body = 'آیا از حذف این آدرس مطمئن هستید؟';
    modalRef.componentInstance.btnValue = 'تایید';
    modalRef.result.then((result: boolean) => {
      if (result) {
        this.locationService
          .remove(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.getList();
          });
      }
    });
  }

  setDefault(id: number) {
    this.locationService
      .setDefault(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.toastService.success('آدرس به عنوان پیشفرض انتخاب شد');
        },
      });
  }

}
