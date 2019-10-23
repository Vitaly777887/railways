import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { StationTrainMySuffixService } from 'app/entities/station-train-my-suffix/station-train-my-suffix.service';
import { IStationTrainMySuffix, StationTrainMySuffix } from 'app/shared/model/station-train-my-suffix.model';

describe('Service Tests', () => {
    describe('StationTrainMySuffix Service', () => {
        let injector: TestBed;
        let service: StationTrainMySuffixService;
        let httpMock: HttpTestingController;
        let elemDefault: IStationTrainMySuffix;
        let expectedResult;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            expectedResult = {};
            injector = getTestBed();
            service = injector.get(StationTrainMySuffixService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new StationTrainMySuffix(0, currentDate, currentDate);
        });

        describe('Service methods', () => {
            it('should find an element', () => {
                const returnedFromService = Object.assign(
                    {
                        arrivalTime: currentDate.format(DATE_TIME_FORMAT),
                        departureTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => (expectedResult = resp));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(returnedFromService);
                expect(expectedResult).toMatchObject({ body: elemDefault });
            });

            it('should create a StationTrainMySuffix', () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        arrivalTime: currentDate.format(DATE_TIME_FORMAT),
                        departureTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        arrivalTime: currentDate,
                        departureTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new StationTrainMySuffix(null))
                    .pipe(take(1))
                    .subscribe(resp => (expectedResult = resp));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(returnedFromService);
                expect(expectedResult).toMatchObject({ body: expected });
            });

            it('should update a StationTrainMySuffix', () => {
                const returnedFromService = Object.assign(
                    {
                        arrivalTime: currentDate.format(DATE_TIME_FORMAT),
                        departureTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        arrivalTime: currentDate,
                        departureTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => (expectedResult = resp));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(returnedFromService);
                expect(expectedResult).toMatchObject({ body: expected });
            });

            it('should return a list of StationTrainMySuffix', () => {
                const returnedFromService = Object.assign(
                    {
                        arrivalTime: currentDate.format(DATE_TIME_FORMAT),
                        departureTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        arrivalTime: currentDate,
                        departureTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => (expectedResult = body));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush([returnedFromService]);
                httpMock.verify();
                expect(expectedResult).toContainEqual(expected);
            });

            it('should delete a StationTrainMySuffix', () => {
                service.delete(123).subscribe(resp => (expectedResult = resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
                expect(expectedResult);
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
