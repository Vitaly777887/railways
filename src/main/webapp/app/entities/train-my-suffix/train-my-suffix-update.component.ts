import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITrainMySuffix, TrainMySuffix } from 'app/shared/model/train-my-suffix.model';
import { TrainMySuffixService } from './train-my-suffix.service';

@Component({
    selector: 'jhi-train-my-suffix-update',
    templateUrl: './train-my-suffix-update.component.html'
})
export class TrainMySuffixUpdateComponent implements OnInit {
    isSaving: boolean;

    editForm = this.fb.group({
        id: [],
        countPassengers: [null, [Validators.required]],
        numberTrain: [null, [Validators.required]]
    });

    constructor(protected trainService: TrainMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ train }) => {
            this.updateForm(train);
        });
    }

    updateForm(train: ITrainMySuffix) {
        this.editForm.patchValue({
            id: train.id,
            countPassengers: train.countPassengers,
            numberTrain: train.numberTrain
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const train = this.createFromForm();
        if (train.id !== undefined) {
            this.subscribeToSaveResponse(this.trainService.update(train));
        } else {
            this.subscribeToSaveResponse(this.trainService.create(train));
        }
    }

    private createFromForm(): ITrainMySuffix {
        return {
            ...new TrainMySuffix(),
            id: this.editForm.get(['id']).value,
            countPassengers: this.editForm.get(['countPassengers']).value,
            numberTrain: this.editForm.get(['numberTrain']).value
        };
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrainMySuffix>>) {
        result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
