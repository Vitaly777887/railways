import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IStationMySuffix, StationMySuffix } from 'app/shared/model/station-my-suffix.model';
import { StationMySuffixService } from './station-my-suffix.service';

@Component({
    selector: 'jhi-station-my-suffix-update',
    templateUrl: './station-my-suffix-update.component.html'
})
export class StationMySuffixUpdateComponent implements OnInit {
    isSaving: boolean;

    editForm = this.fb.group({
        id: [],
        name: [null, [Validators.required]]
    });

    constructor(protected stationService: StationMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ station }) => {
            this.updateForm(station);
        });
    }

    updateForm(station: IStationMySuffix) {
        this.editForm.patchValue({
            id: station.id,
            name: station.name
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const station = this.createFromForm();
        if (station.id !== undefined) {
            this.subscribeToSaveResponse(this.stationService.update(station));
        } else {
            this.subscribeToSaveResponse(this.stationService.create(station));
        }
    }

    private createFromForm(): IStationMySuffix {
        return {
            ...new StationMySuffix(),
            id: this.editForm.get(['id']).value,
            name: this.editForm.get(['name']).value
        };
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStationMySuffix>>) {
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
