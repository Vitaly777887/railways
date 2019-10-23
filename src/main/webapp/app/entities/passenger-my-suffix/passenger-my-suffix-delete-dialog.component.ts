import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPassengerMySuffix } from 'app/shared/model/passenger-my-suffix.model';
import { PassengerMySuffixService } from './passenger-my-suffix.service';

@Component({
    selector: 'jhi-passenger-my-suffix-delete-dialog',
    templateUrl: './passenger-my-suffix-delete-dialog.component.html'
})
export class PassengerMySuffixDeleteDialogComponent {
    passenger: IPassengerMySuffix;

    constructor(
        protected passengerService: PassengerMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.passengerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'passengerListModification',
                content: 'Deleted an passenger'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-passenger-my-suffix-delete-popup',
    template: ''
})
export class PassengerMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ passenger }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PassengerMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.passenger = passenger;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/passenger-my-suffix', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/passenger-my-suffix', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
