import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RailwaysTestModule } from '../../../test.module';
import { StationMySuffixDetailComponent } from 'app/entities/station-my-suffix/station-my-suffix-detail.component';
import { StationMySuffix } from 'app/shared/model/station-my-suffix.model';

describe('Component Tests', () => {
    describe('StationMySuffix Management Detail Component', () => {
        let comp: StationMySuffixDetailComponent;
        let fixture: ComponentFixture<StationMySuffixDetailComponent>;
        const route = ({ data: of({ station: new StationMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [StationMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StationMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StationMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.station).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
