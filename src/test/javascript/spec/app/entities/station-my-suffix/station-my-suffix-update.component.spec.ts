import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RailwaysTestModule } from '../../../test.module';
import { StationMySuffixUpdateComponent } from 'app/entities/station-my-suffix/station-my-suffix-update.component';
import { StationMySuffixService } from 'app/entities/station-my-suffix/station-my-suffix.service';
import { StationMySuffix } from 'app/shared/model/station-my-suffix.model';

describe('Component Tests', () => {
    describe('StationMySuffix Management Update Component', () => {
        let comp: StationMySuffixUpdateComponent;
        let fixture: ComponentFixture<StationMySuffixUpdateComponent>;
        let service: StationMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [StationMySuffixUpdateComponent],
                providers: [FormBuilder]
            })
                .overrideTemplate(StationMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StationMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StationMySuffixService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new StationMySuffix(123);
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
                const entity = new StationMySuffix();
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
