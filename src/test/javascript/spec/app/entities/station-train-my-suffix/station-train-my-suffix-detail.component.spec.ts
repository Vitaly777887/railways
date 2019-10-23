import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RailwaysTestModule } from '../../../test.module';
import { StationTrainMySuffixDetailComponent } from 'app/entities/station-train-my-suffix/station-train-my-suffix-detail.component';
import { StationTrainMySuffix } from 'app/shared/model/station-train-my-suffix.model';

describe('Component Tests', () => {
    describe('StationTrainMySuffix Management Detail Component', () => {
        let comp: StationTrainMySuffixDetailComponent;
        let fixture: ComponentFixture<StationTrainMySuffixDetailComponent>;
        const route = ({ data: of({ stationTrain: new StationTrainMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [StationTrainMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StationTrainMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StationTrainMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.stationTrain).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
