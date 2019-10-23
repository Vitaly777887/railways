import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { IPassengerMySuffix } from 'app/shared/model/passenger-my-suffix.model';
import { AccountService } from 'app/core/auth/account.service';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PassengerMySuffixService } from './passenger-my-suffix.service';

@Component({
    selector: 'jhi-passenger-my-suffix',
    templateUrl: './passenger-my-suffix.component.html'
})
export class PassengerMySuffixComponent implements OnInit, OnDestroy {
    currentAccount: any;
    passengers: IPassengerMySuffix[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        protected passengerService: PassengerMySuffixService,
        protected parseLinks: JhiParseLinks,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.passengerService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe((res: HttpResponse<IPassengerMySuffix[]>) => this.paginatePassengers(res.body, res.headers));
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/passenger-my-suffix'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/passenger-my-suffix',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().subscribe(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPassengers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPassengerMySuffix) {
        return item.id;
    }

    registerChangeInPassengers() {
        this.eventSubscriber = this.eventManager.subscribe('passengerListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginatePassengers(data: IPassengerMySuffix[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.passengers = data;
    }
}
