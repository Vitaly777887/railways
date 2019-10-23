import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RailwaysTestModule } from '../../../test.module';
import { StationTrainMySuffixUpdateComponent } from 'app/entities/station-train-my-suffix/station-train-my-suffix-update.component';
import { StationTrainMySuffixService } from 'app/entities/station-train-my-suffix/station-train-my-suffix.service';
import { StationTrainMySuffix } from 'app/shared/model/station-train-my-suffix.model';

describe('Component Tests', () => {
    describe('StationTrainMySuffix Management Update Component', () => {
        let comp: StationTrainMySuffixUpdateComponent;
        let fixture: ComponentFixture<StationTrainMySuffixUpdateComponent>;
        let service: StationTrainMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [StationTrainMySuffixUpdateComponent],
                providers: [FormBuilder]
            })
                .overrideTemplate(StationTrainMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StationTrainMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StationTrainMySuffixService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new StationTrainMySuffix(123);
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
                const entity = new StationTrainMySuffix();
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
