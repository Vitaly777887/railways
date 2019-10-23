import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStationMySuffix } from 'app/shared/model/station-my-suffix.model';

type EntityResponseType = HttpResponse<IStationMySuffix>;
type EntityArrayResponseType = HttpResponse<IStationMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class StationMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/stations';

    constructor(protected http: HttpClient) {}

    create(station: IStationMySuffix): Observable<EntityResponseType> {
        return this.http.post<IStationMySuffix>(this.resourceUrl, station, { observe: 'response' });
    }

    update(station: IStationMySuffix): Observable<EntityResponseType> {
        return this.http.put<IStationMySuffix>(this.resourceUrl, station, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IStationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IStationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
