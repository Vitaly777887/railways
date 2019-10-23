import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStationMySuffix } from 'app/shared/model/station-my-suffix.model';

@Component({
    selector: 'jhi-station-my-suffix-detail',
    templateUrl: './station-my-suffix-detail.component.html'
})
export class StationMySuffixDetailComponent implements OnInit {
    station: IStationMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ station }) => {
            this.station = station;
        });
    }

    previousState() {
        window.history.back();
    }
}
