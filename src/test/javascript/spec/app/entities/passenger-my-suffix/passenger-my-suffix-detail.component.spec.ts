import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RailwaysTestModule } from '../../../test.module';
import { PassengerMySuffixDetailComponent } from 'app/entities/passenger-my-suffix/passenger-my-suffix-detail.component';
import { PassengerMySuffix } from 'app/shared/model/passenger-my-suffix.model';

describe('Component Tests', () => {
    describe('PassengerMySuffix Management Detail Component', () => {
        let comp: PassengerMySuffixDetailComponent;
        let fixture: ComponentFixture<PassengerMySuffixDetailComponent>;
        const route = ({ data: of({ passenger: new PassengerMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [PassengerMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PassengerMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PassengerMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.passenger).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
