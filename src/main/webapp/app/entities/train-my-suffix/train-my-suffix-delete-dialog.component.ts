import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrainMySuffix } from 'app/shared/model/train-my-suffix.model';
import { TrainMySuffixService } from './train-my-suffix.service';

@Component({
    selector: 'jhi-train-my-suffix-delete-dialog',
    templateUrl: './train-my-suffix-delete-dialog.component.html'
})
export class TrainMySuffixDeleteDialogComponent {
    train: ITrainMySuffix;

    constructor(
        protected trainService: TrainMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trainService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'trainListModification',
                content: 'Deleted an train'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-train-my-suffix-delete-popup',
    template: ''
})
export class TrainMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ train }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TrainMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.train = train;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/train-my-suffix', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/train-my-suffix', { outlets: { popup: null } }]);
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
