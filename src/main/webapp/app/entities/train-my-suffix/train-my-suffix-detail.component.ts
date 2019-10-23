import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrainMySuffix } from 'app/shared/model/train-my-suffix.model';

@Component({
    selector: 'jhi-train-my-suffix-detail',
    templateUrl: './train-my-suffix-detail.component.html'
})
export class TrainMySuffixDetailComponent implements OnInit {
    train: ITrainMySuffix;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ train }) => {
            this.train = train;
        });
    }

    previousState() {
        window.history.back();
    }
}
