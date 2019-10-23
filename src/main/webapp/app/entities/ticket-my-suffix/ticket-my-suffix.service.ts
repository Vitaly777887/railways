import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITicketMySuffix } from 'app/shared/model/ticket-my-suffix.model';

type EntityResponseType = HttpResponse<ITicketMySuffix>;
type EntityArrayResponseType = HttpResponse<ITicketMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class TicketMySuffixService {
    public resourceUrl = SERVER_API_URL + 'api/tickets';

    constructor(protected http: HttpClient) {}

    create(ticket: ITicketMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ticket);
        return this.http
            .post<ITicketMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(ticket: ITicketMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(ticket);
        return this.http
            .put<ITicketMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITicketMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITicketMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(ticket: ITicketMySuffix): ITicketMySuffix {
        const copy: ITicketMySuffix = Object.assign({}, ticket, {
            registerDate: ticket.registerDate != null && ticket.registerDate.isValid() ? ticket.registerDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.registerDate = res.body.registerDate != null ? moment(res.body.registerDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((ticket: ITicketMySuffix) => {
                ticket.registerDate = ticket.registerDate != null ? moment(ticket.registerDate) : null;
            });
        }
        return res;
    }
}
