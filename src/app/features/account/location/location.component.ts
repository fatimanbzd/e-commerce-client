import { Component } from '@angular/core';
import { LocationListComponent } from './components/location-list/location-list.component';
import { LocationUpdateDialogComponent } from './components/location-update-dialog/location-update-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-location',
    imports: [LocationListComponent],
    templateUrl: './location.component.html',
    styleUrl: './location.component.scss'
})
export class LocationComponent {
  constructor(private modalService: NgbModal) {}

  openAddModel() {
    const modalRef = this.modalService.open(LocationUpdateDialogComponent);
    modalRef.componentInstance.location = null;
  }
}
