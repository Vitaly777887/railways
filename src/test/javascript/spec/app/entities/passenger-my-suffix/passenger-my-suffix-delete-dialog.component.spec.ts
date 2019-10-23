import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RailwaysTestModule } from '../../../test.module';
import { PassengerMySuffixDeleteDialogComponent } from 'app/entities/passenger-my-suffix/passenger-my-suffix-delete-dialog.component';
import { PassengerMySuffixService } from 'app/entities/passenger-my-suffix/passenger-my-suffix.service';

describe('Component Tests', () => {
    describe('PassengerMySuffix Management Delete Component', () => {
        let comp: PassengerMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PassengerMySuffixDeleteDialogComponent>;
        let service: PassengerMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [PassengerMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(PassengerMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PassengerMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PassengerMySuffixService);
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
