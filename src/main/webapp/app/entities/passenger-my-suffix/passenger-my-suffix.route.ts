import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PassengerMySuffix } from 'app/shared/model/passenger-my-suffix.model';
import { PassengerMySuffixService } from './passenger-my-suffix.service';
import { PassengerMySuffixComponent } from './passenger-my-suffix.component';
import { PassengerMySuffixDetailComponent } from './passenger-my-suffix-detail.component';
import { PassengerMySuffixUpdateComponent } from './passenger-my-suffix-update.component';
import { PassengerMySuffixDeletePopupComponent } from './passenger-my-suffix-delete-dialog.component';
import { IPassengerMySuffix } from 'app/shared/model/passenger-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class PassengerMySuffixResolve implements Resolve<IPassengerMySuffix> {
    constructor(private service: PassengerMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPassengerMySuffix> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PassengerMySuffix>) => response.ok),
                map((passenger: HttpResponse<PassengerMySuffix>) => passenger.body)
            );
        }
        return of(new PassengerMySuffix());
    }
}

export const passengerRoute: Routes = [
    {
        path: '',
        component: PassengerMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'railwaysApp.passenger.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PassengerMySuffixDetailComponent,
        resolve: {
            passenger: PassengerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.passenger.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PassengerMySuffixUpdateComponent,
        resolve: {
            passenger: PassengerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.passenger.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PassengerMySuffixUpdateComponent,
        resolve: {
            passenger: PassengerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.passenger.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const passengerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PassengerMySuffixDeletePopupComponent,
        resolve: {
            passenger: PassengerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.passenger.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
