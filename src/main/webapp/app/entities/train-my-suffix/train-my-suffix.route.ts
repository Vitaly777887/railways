import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TrainMySuffix } from 'app/shared/model/train-my-suffix.model';
import { TrainMySuffixService } from './train-my-suffix.service';
import { TrainMySuffixComponent } from './train-my-suffix.component';
import { TrainMySuffixDetailComponent } from './train-my-suffix-detail.component';
import { TrainMySuffixUpdateComponent } from './train-my-suffix-update.component';
import { TrainMySuffixDeletePopupComponent } from './train-my-suffix-delete-dialog.component';
import { ITrainMySuffix } from 'app/shared/model/train-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class TrainMySuffixResolve implements Resolve<ITrainMySuffix> {
    constructor(private service: TrainMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITrainMySuffix> {
        const id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TrainMySuffix>) => response.ok),
                map((train: HttpResponse<TrainMySuffix>) => train.body)
            );
        }
        return of(new TrainMySuffix());
    }
}

export const trainRoute: Routes = [
    {
        path: '',
        component: TrainMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'railwaysApp.train.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TrainMySuffixDetailComponent,
        resolve: {
            train: TrainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.train.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TrainMySuffixUpdateComponent,
        resolve: {
            train: TrainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.train.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TrainMySuffixUpdateComponent,
        resolve: {
            train: TrainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.train.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const trainPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TrainMySuffixDeletePopupComponent,
        resolve: {
            train: TrainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'railwaysApp.train.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
