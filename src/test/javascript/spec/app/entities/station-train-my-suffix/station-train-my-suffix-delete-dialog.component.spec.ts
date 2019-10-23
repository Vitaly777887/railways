import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RailwaysTestModule } from '../../../test.module';
import { StationTrainMySuffixDeleteDialogComponent } from 'app/entities/station-train-my-suffix/station-train-my-suffix-delete-dialog.component';
import { StationTrainMySuffixService } from 'app/entities/station-train-my-suffix/station-train-my-suffix.service';

describe('Component Tests', () => {
    describe('StationTrainMySuffix Management Delete Component', () => {
        let comp: StationTrainMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<StationTrainMySuffixDeleteDialogComponent>;
        let service: StationTrainMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [StationTrainMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(StationTrainMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StationTrainMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StationTrainMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
