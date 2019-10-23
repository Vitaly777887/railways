import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPassengerMySuffix } from 'app/shared/model/passenger-my-suffix.model';

type EntityResponseType = HttpResponse<IPassengerMySuffix>;
type EntityArrayResponseType = HttpResponse<IPassengerMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class PassengerMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/passengers';

    constructor(protected http: HttpClient) {}

    create(passenger: IPassengerMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(passenger);
        return this.http
            .post<IPassengerMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(passenger: IPassengerMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(passenger);
        return this.http
            .put<IPassengerMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPassengerMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPassengerMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(passenger: IPassengerMySuffix): IPassengerMySuffix {
        const copy: IPassengerMySuffix = Object.assign({}, passenger, {
            birthday: passenger.birthday != null && passenger.birthday.isValid() ? passenger.birthday.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.birthday = res.body.birthday != null ? moment(res.body.birthday) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((passenger: IPassengerMySuffix) => {
                passenger.birthday = passenger.birthday != null ? moment(passenger.birthday) : null;
            });
        }
        return res;
    }
}
