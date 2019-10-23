import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStationMySuffix } from 'app/shared/model/station-my-suffix.model';
import { StationMySuffixService } from './station-my-suffix.service';

@Component({
    selector: 'jhi-station-my-suffix-delete-dialog',
    templateUrl: './station-my-suffix-delete-dialog.component.html'
})
export class StationMySuffixDeleteDialogComponent {
    station: IStationMySuffix;

    constructor(
        protected stationService: StationMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stationListModification',
                content: 'Deleted an station'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-station-my-suffix-delete-popup',
    template: ''
})
export class StationMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ station }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StationMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.station = station;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/station-my-suffix', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/station-my-suffix', { outlets: { popup: null } }]);
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
