import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RailwaysTestModule } from '../../../test.module';
import { TrainMySuffixDeleteDialogComponent } from 'app/entities/train-my-suffix/train-my-suffix-delete-dialog.component';
import { TrainMySuffixService } from 'app/entities/train-my-suffix/train-my-suffix.service';

describe('Component Tests', () => {
    describe('TrainMySuffix Management Delete Component', () => {
        let comp: TrainMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TrainMySuffixDeleteDialogComponent>;
        let service: TrainMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [TrainMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(TrainMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrainMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainMySuffixService);
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
