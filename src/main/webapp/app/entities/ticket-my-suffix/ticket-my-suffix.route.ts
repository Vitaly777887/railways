import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TicketMySuffix } from 'app/shared/model/ticket-my-suffix.model';
import { TicketMySuffixService } from './ticket-my-suffix.service';
import { TicketMySuffixComponent } from './ticket-my-suffix.component';
import { TicketMySuffixDetailComponent } from './ticket-my-suffix-detail.component';
import { TicketMySuffixUpdateComponent } from './ticket-my-suffix-update.component';
import { TicketMySuffixDeletePopupComponent } from './ticket-my-suffix-delete-dialog.component';
import { ITicketMySuffix } from 'app/shared/model/ticket-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TicketMySuffixResolve implements Resolve<ITicketMySuffix> {
    constructor(private service: TicketMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITicketMySuffix> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TicketMySuffix>) => response.ok),
                map((ticket: HttpResponse<TicketMySuffix>) => ticket.body)
            );
        }
        return of(new TicketMySuffix());
    }
}

export const ticketRoute: Routes = [
    {
        path: '',
        component: TicketMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'railwaysApp.ticket.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TicketMySuffixDetailComponent,
        resolve: {
            ticket: TicketMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.ticket.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TicketMySuffixUpdateComponent,
        resolve: {
            ticket: TicketMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.ticket.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TicketMySuffixUpdateComponent,
        resolve: {
            ticket: TicketMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.ticket.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ticketPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TicketMySuffixDeletePopupComponent,
        resolve: {
            ticket: TicketMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.ticket.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
