import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RailwaysTestModule } from '../../../test.module';
import { TicketMySuffixUpdateComponent } from 'app/entities/ticket-my-suffix/ticket-my-suffix-update.component';
import { TicketMySuffixService } from 'app/entities/ticket-my-suffix/ticket-my-suffix.service';
import { TicketMySuffix } from 'app/shared/model/ticket-my-suffix.model';

describe('Component Tests', () => {
    describe('TicketMySuffix Management Update Component', () => {
        let comp: TicketMySuffixUpdateComponent;
        let fixture: ComponentFixture<TicketMySuffixUpdateComponent>;
        let service: TicketMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [TicketMySuffixUpdateComponent],
                providers: [FormBuilder]
            })
                .overrideTemplate(TicketMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TicketMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TicketMySuffixService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TicketMySuffix(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.updateForm(entity);
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TicketMySuffix();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.updateForm(entity);
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
