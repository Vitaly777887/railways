import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStationTrainMySuffix } from 'app/shared/model/station-train-my-suffix.model';
import { StationTrainMySuffixService } from './station-train-my-suffix.service';

@Component({
    selector: 'jhi-station-train-my-suffix-delete-dialog',
    templateUrl: './station-train-my-suffix-delete-dialog.component.html'
})
export class StationTrainMySuffixDeleteDialogComponent {
    stationTrain: IStationTrainMySuffix;

    constructor(
        protected stationTrainService: StationTrainMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stationTrainService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stationTrainListModification',
                content: 'Deleted an stationTrain'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-station-train-my-suffix-delete-popup',
    template: ''
})
export class StationTrainMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stationTrain }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StationTrainMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.stationTrain = stationTrain;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/station-train-my-suffix', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/station-train-my-suffix', { outlets: { popup: null } }]);
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
