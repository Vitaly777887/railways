import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RailwaysTestModule } from '../../../test.module';
import { TicketMySuffixDetailComponent } from 'app/entities/ticket-my-suffix/ticket-my-suffix-detail.component';
import { TicketMySuffix } from 'app/shared/model/ticket-my-suffix.model';

describe('Component Tests', () => {
    describe('TicketMySuffix Management Detail Component', () => {
        let comp: TicketMySuffixDetailComponent;
        let fixture: ComponentFixture<TicketMySuffixDetailComponent>;
        const route = ({ data: of({ ticket: new TicketMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [TicketMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TicketMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TicketMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ticket).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
