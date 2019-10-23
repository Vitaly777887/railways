import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStationTrainMySuffix } from 'app/shared/model/station-train-my-suffix.model';

type EntityResponseType = HttpResponse<IStationTrainMySuffix>;
type EntityArrayResponseType = HttpResponse<IStationTrainMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class StationTrainMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/station-trains';

    constructor(protected http: HttpClient) {}

    create(stationTrain: IStationTrainMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stationTrain);
        return this.http
            .post<IStationTrainMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(stationTrain: IStationTrainMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(stationTrain);
        return this.http
            .put<IStationTrainMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IStationTrainMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IStationTrainMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(stationTrain: IStationTrainMySuffix): IStationTrainMySuffix {
        const copy: IStationTrainMySuffix = Object.assign({}, stationTrain, {
            arrivalTime: stationTrain.arrivalTime != null && stationTrain.arrivalTime.isValid() ? stationTrain.arrivalTime.toJSON() : null,
            departureTime:
                stationTrain.departureTime != null && stationTrain.departureTime.isValid() ? stationTrain.departureTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.arrivalTime = res.body.arrivalTime != null ? moment(res.body.arrivalTime) : null;
            res.body.departureTime = res.body.departureTime != null ? moment(res.body.departureTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((stationTrain: IStationTrainMySuffix) => {
                stationTrain.arrivalTime = stationTrain.arrivalTime != null ? moment(stationTrain.arrivalTime) : null;
                stationTrain.departureTime = stationTrain.departureTime != null ? moment(stationTrain.departureTime) : null;
            });
        }
        return res;
    }
}
