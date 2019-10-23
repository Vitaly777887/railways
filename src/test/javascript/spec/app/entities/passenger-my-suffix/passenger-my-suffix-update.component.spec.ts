import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RailwaysTestModule } from '../../../test.module';
import { PassengerMySuffixUpdateComponent } from 'app/entities/passenger-my-suffix/passenger-my-suffix-update.component';
import { PassengerMySuffixService } from 'app/entities/passenger-my-suffix/passenger-my-suffix.service';
import { PassengerMySuffix } from 'app/shared/model/passenger-my-suffix.model';

describe('Component Tests', () => {
    describe('PassengerMySuffix Management Update Component', () => {
        let comp: PassengerMySuffixUpdateComponent;
        let fixture: ComponentFixture<PassengerMySuffixUpdateComponent>;
        let service: PassengerMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [PassengerMySuffixUpdateComponent],
                providers: [FormBuilder]
            })
                .overrideTemplate(PassengerMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PassengerMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PassengerMySuffixService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new PassengerMySuffix(123);
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
                const entity = new PassengerMySuffix();
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
