import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITicketMySuffix, TicketMySuffix } from 'app/shared/model/ticket-my-suffix.model';
import { TicketMySuffixService } from './ticket-my-suffix.service';
import { IPassengerMySuffix } from 'app/shared/model/passenger-my-suffix.model';
import { PassengerMySuffixService } from 'app/entities/passenger-my-suffix/passenger-my-suffix.service';
import { ITrainMySuffix } from 'app/shared/model/train-my-suffix.model';
import { TrainMySuffixService } from 'app/entities/train-my-suffix/train-my-suffix.service';

@Component({
    selector: 'jhi-ticket-my-suffix-update',
    templateUrl: './ticket-my-suffix-update.component.html'
})
export class TicketMySuffixUpdateComponent implements OnInit {
    isSaving: boolean;

    passengers: IPassengerMySuffix[];

    trains: ITrainMySuffix[];
    registerDateDp: any;

    editForm = this.fb.group({
        id: [],
        registerDate: [null, [Validators.required]],
        passengerId: [],
        trainId: [null, Validators.required]
    });

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ticketService: TicketMySuffixService,
        protected passengerService: PassengerMySuffixService,
        protected trainService: TrainMySuffixService,
        protected activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ticket }) => {
            this.updateForm(ticket);
        });
        this.passengerService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IPassengerMySuffix[]>) => mayBeOk.ok),
                map((response: HttpResponse<IPassengerMySuffix[]>) => response.body)
            )
            .subscribe((res: IPassengerMySuffix[]) => (this.passengers = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.trainService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITrainMySuffix[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITrainMySuffix[]>) => response.body)
            )
            .subscribe((res: ITrainMySuffix[]) => (this.trains = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    updateForm(ticket: ITicketMySuffix) {
        this.editForm.patchValue({
            id: ticket.id,
            registerDate: ticket.registerDate,
            passengerId: ticket.passengerId,
            trainId: ticket.trainId
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        const ticket = this.createFromForm();
        if (ticket.id !== undefined) {
            this.subscribeToSaveResponse(this.ticketService.update(ticket));
        } else {
            this.subscribeToSaveResponse(this.ticketService.create(ticket));
        }
    }

    private createFromForm(): ITicketMySuffix {
        return {
            ...new TicketMySuffix(),
            id: this.editForm.get(['id']).value,
            registerDate: this.editForm.get(['registerDate']).value,
            passengerId: this.editForm.get(['passengerId']).value,
            trainId: this.editForm.get(['trainId']).value
        };
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITicketMySuffix>>) {
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

    trackPassengerById(index: number, item: IPassengerMySuffix) {
        return item.id;
    }

    trackTrainById(index: number, item: ITrainMySuffix) {
        return item.id;
    }
}
