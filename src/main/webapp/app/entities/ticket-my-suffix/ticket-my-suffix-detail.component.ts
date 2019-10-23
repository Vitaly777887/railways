import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITicketMySuffix } from 'app/shared/model/ticket-my-suffix.model';

@Component({
    selector: 'jhi-ticket-my-suffix-detail',
    templateUrl: './ticket-my-suffix-detail.component.html'
})
export class TicketMySuffixDetailComponent implements OnInit {
    ticket: ITicketMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ticket }) => {
            this.ticket = ticket;
        });
    }

    previousState() {
        window.history.back();
    }
}
