import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StationTrainMySuffix } from 'app/shared/model/station-train-my-suffix.model';
import { StationTrainMySuffixService } from './station-train-my-suffix.service';
import { StationTrainMySuffixComponent } from './station-train-my-suffix.component';
import { StationTrainMySuffixDetailComponent } from './station-train-my-suffix-detail.component';
import { StationTrainMySuffixUpdateComponent } from './station-train-my-suffix-update.component';
import { StationTrainMySuffixDeletePopupComponent } from './station-train-my-suffix-delete-dialog.component';
import { IStationTrainMySuffix } from 'app/shared/model/station-train-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class StationTrainMySuffixResolve implements Resolve<IStationTrainMySuffix> {
    constructor(private service: StationTrainMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStationTrainMySuffix> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<StationTrainMySuffix>) => response.ok),
                map((stationTrain: HttpResponse<StationTrainMySuffix>) => stationTrain.body)
            );
        }
        return of(new StationTrainMySuffix());
    }
}

export const stationTrainRoute: Routes = [
    {
        path: '',
        component: StationTrainMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'railwaysApp.stationTrain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: StationTrainMySuffixDetailComponent,
        resolve: {
            stationTrain: StationTrainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.stationTrain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: StationTrainMySuffixUpdateComponent,
        resolve: {
            stationTrain: StationTrainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.stationTrain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: StationTrainMySuffixUpdateComponent,
        resolve: {
            stationTrain: StationTrainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.stationTrain.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stationTrainPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: StationTrainMySuffixDeletePopupComponent,
        resolve: {
            stationTrain: StationTrainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.stationTrain.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
