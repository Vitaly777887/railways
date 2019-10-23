import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RailwaysTestModule } from '../../../test.module';
import { TrainMySuffixDetailComponent } from 'app/entities/train-my-suffix/train-my-suffix-detail.component';
import { TrainMySuffix } from 'app/shared/model/train-my-suffix.model';

describe('Component Tests', () => {
    describe('TrainMySuffix Management Detail Component', () => {
        let comp: TrainMySuffixDetailComponent;
        let fixture: ComponentFixture<TrainMySuffixDetailComponent>;
        const route = ({ data: of({ train: new TrainMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [TrainMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrainMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrainMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.train).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
