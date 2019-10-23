import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITrainMySuffix } from 'app/shared/model/train-my-suffix.model';

type EntityResponseType = HttpResponse<ITrainMySuffix>;
type EntityArrayResponseType = HttpResponse<ITrainMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TrainMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/trains';

    constructor(protected http: HttpClient) {}

    create(train: ITrainMySuffix): Observable<EntityResponseType> {
        return this.http.post<ITrainMySuffix>(this.resourceUrl, train, { observe: 'response' });
    }

    update(train: ITrainMySuffix): Observable<EntityResponseType> {
        return this.http.put<ITrainMySuffix>(this.resourceUrl, train, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITrainMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITrainMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
