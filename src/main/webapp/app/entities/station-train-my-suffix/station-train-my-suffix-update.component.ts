import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IStationTrainMySuffix, StationTrainMySuffix } from 'app/shared/model/station-train-my-suffix.model';
import { StationTrainMySuffixService } from './station-train-my-suffix.service';
import { IStationMySuffix } from 'app/shared/model/station-my-suffix.model';
import { StationMySuffixService } from 'app/entities/station-my-suffix/station-my-suffix.service';
import { ITrainMySuffix } from 'app/shared/model/train-my-suffix.model';
import { TrainMySuffixService } from 'app/entities/train-my-suffix/train-my-suffix.service';

@Component({
    selector: 'jhi-station-train-my-suffix-update',
    templateUrl: './station-train-my-suffix-update.component.html'
})
export class StationTrainMySuffixUpdateComponent implements OnInit {
    isSaving: boolean;

    stations: IStationMySuffix[];

    trains: ITrainMySuffix[];

    editForm = this.fb.group({
        id: [],
        arrivalTime: [null, [Validators.required]],
        departureTime: [null, [Validators.required]],
        stationId: [null, Validators.required],
        trainId: [null, Validators.required]
    });

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected stationTrainService: StationTrainMySuffixService,
        protected stationService: StationMySuffixService,
        protected trainService: TrainMySuffixService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ stationTrain }) => {
            this.updateForm(stationTrain);
        });
        this.stationService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IStationMySuffix[]>) => mayBeOk.ok),
                map((response: HttpResponse<IStationMySuffix[]>) => response.body)
            )
            .subscribe((res: IStationMySuffix[]) => (this.stations = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.trainService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITrainMySuffix[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITrainMySuffix[]>) => response.body)
            )
            .subscribe((res: ITrainMySuffix[]) => (this.trains = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    updateForm(stationTrain: IStationTrainMySuffix) {
        this.editForm.patchValue({
            id: stationTrain.id,
            arrivalTime: stationTrain.arrivalTime != null ? stationTrain.arrivalTime.format(DATE_TIME_FORMAT) : null,
            departureTime: stationTrain.departureTime != null ? stationTrain.departureTime.format(DATE_TIME_FORMAT) : null,
            stationId: stationTrain.stationId,
            trainId: stationTrain.trainId
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const stationTrain = this.createFromForm();
        if (stationTrain.id !== undefined) {
            this.subscribeToSaveResponse(this.stationTrainService.update(stationTrain));
        } else {
            this.subscribeToSaveResponse(this.stationTrainService.create(stationTrain));
        }
    }

    private createFromForm(): IStationTrainMySuffix {
        return {
            ...new StationTrainMySuffix(),
            id: this.editForm.get(['id']).value,
            arrivalTime:
                this.editForm.get(['arrivalTime']).value != null
                    ? moment(this.editForm.get(['arrivalTime']).value, DATE_TIME_FORMAT)
                    : undefined,
            departureTime:
                this.editForm.get(['departureTime']).value != null
                    ? moment(this.editForm.get(['departureTime']).value, DATE_TIME_FORMAT)
                    : undefined,
            stationId: this.editForm.get(['stationId']).value,
            trainId: this.editForm.get(['trainId']).value
        };
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStationTrainMySuffix>>) {
        result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackStationById(index: number, item: IStationMySuffix) {
        return item.id;
    }

    trackTrainById(index: number, item: ITrainMySuffix) {
        return item.id;
    }
}
