import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPassengerMySuffix } from 'app/shared/model/passenger-my-suffix.model';

@Component({
    selector: 'jhi-passenger-my-suffix-detail',
    templateUrl: './passenger-my-suffix-detail.component.html'
})
export class PassengerMySuffixDetailComponent implements OnInit {
    passenger: IPassengerMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ passenger }) => {
            this.passenger = passenger;
        });
    }

    previousState() {
        window.history.back();
    }
}
