import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStationTrainMySuffix } from 'app/shared/model/station-train-my-suffix.model';

@Component({
    selector: 'jhi-station-train-my-suffix-detail',
    templateUrl: './station-train-my-suffix-detail.component.html'
})
export class StationTrainMySuffixDetailComponent implements OnInit {
    stationTrain: IStationTrainMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ stationTrain }) => {
            this.stationTrain = stationTrain;
        });
    }

    previousState() {
        window.history.back();
    }
}
