import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StationMySuffix } from 'app/shared/model/station-my-suffix.model';
import { StationMySuffixService } from './station-my-suffix.service';
import { StationMySuffixComponent } from './station-my-suffix.component';
import { StationMySuffixDetailComponent } from './station-my-suffix-detail.component';
import { StationMySuffixUpdateComponent } from './station-my-suffix-update.component';
import { StationMySuffixDeletePopupComponent } from './station-my-suffix-delete-dialog.component';
import { IStationMySuffix } from 'app/shared/model/station-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class StationMySuffixResolve implements Resolve<IStationMySuffix> {
    constructor(private service: StationMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStationMySuffix> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<StationMySuffix>) => response.ok),
                map((station: HttpResponse<StationMySuffix>) => station.body)
            );
        }
        return of(new StationMySuffix());
    }
}

export const stationRoute: Routes = [
    {
        path: '',
        component: StationMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'railwaysApp.station.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: StationMySuffixDetailComponent,
        resolve: {
            station: StationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.station.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: StationMySuffixUpdateComponent,
        resolve: {
            station: StationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.station.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: StationMySuffixUpdateComponent,
        resolve: {
            station: StationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.station.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stationPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: StationMySuffixDeletePopupComponent,
        resolve: {
            station: StationMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.station.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
