import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IPassengerMySuffix, PassengerMySuffix } from 'app/shared/model/passenger-my-suffix.model';
import { PassengerMySuffixService } from './passenger-my-suffix.service';

@Component({
    selector: 'jhi-passenger-my-suffix-update',
    templateUrl: './passenger-my-suffix-update.component.html'
})
export class PassengerMySuffixUpdateComponent implements OnInit {
    isSaving: boolean;
    birthdayDp: any;

    editForm = this.fb.group({
        id: [],
        name: [null, [Validators.required]],
        surname: [null, [Validators.required]],
        birthday: [null, [Validators.required]]
    });

    constructor(protected passengerService: PassengerMySuffixService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ passenger }) => {
            this.updateForm(passenger);
        });
    }

    updateForm(passenger: IPassengerMySuffix) {
        this.editForm.patchValue({
            id: passenger.id,
            name: passenger.name,
            surname: passenger.surname,
            birthday: passenger.birthday
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const passenger = this.createFromForm();
        if (passenger.id !== undefined) {
            this.subscribeToSaveResponse(this.passengerService.update(passenger));
        } else {
            this.subscribeToSaveResponse(this.passengerService.create(passenger));
        }
    }

    private createFromForm(): IPassengerMySuffix {
        return {
            ...new PassengerMySuffix(),
            id: this.editForm.get(['id']).value,
            name: this.editForm.get(['name']).value,
            surname: this.editForm.get(['surname']).value,
            birthday: this.editForm.get(['birthday']).value
        };
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPassengerMySuffix>>) {
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
