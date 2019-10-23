import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITicketMySuffix } from 'app/shared/model/ticket-my-suffix.model';
import { TicketMySuffixService } from './ticket-my-suffix.service';

@Component({
    selector: 'jhi-ticket-my-suffix-delete-dialog',
    templateUrl: './ticket-my-suffix-delete-dialog.component.html'
})
export class TicketMySuffixDeleteDialogComponent {
    ticket: ITicketMySuffix;

    constructor(
        protected ticketService: TicketMySuffixService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ticketService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'ticketListModification',
                content: 'Deleted an ticket'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ticket-my-suffix-delete-popup',
    template: ''
})
export class TicketMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ticket }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TicketMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.ticket = ticket;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/ticket-my-suffix', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/ticket-my-suffix', { outlets: { popup: null } }]);
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
