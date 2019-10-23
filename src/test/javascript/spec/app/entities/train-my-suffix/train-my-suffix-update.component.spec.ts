import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RailwaysTestModule } from '../../../test.module';
import { TrainMySuffixUpdateComponent } from 'app/entities/train-my-suffix/train-my-suffix-update.component';
import { TrainMySuffixService } from 'app/entities/train-my-suffix/train-my-suffix.service';
import { TrainMySuffix } from 'app/shared/model/train-my-suffix.model';

describe('Component Tests', () => {
    describe('TrainMySuffix Management Update Component', () => {
        let comp: TrainMySuffixUpdateComponent;
        let fixture: ComponentFixture<TrainMySuffixUpdateComponent>;
        let service: TrainMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [TrainMySuffixUpdateComponent],
                providers: [FormBuilder]
            })
                .overrideTemplate(TrainMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrainMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainMySuffixService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TrainMySuffix(123);
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
                const entity = new TrainMySuffix();
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
