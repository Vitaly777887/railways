import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RailwaysTestModule } from '../../../test.module';
import { StationMySuffixDeleteDialogComponent } from 'app/entities/station-my-suffix/station-my-suffix-delete-dialog.component';
import { StationMySuffixService } from 'app/entities/station-my-suffix/station-my-suffix.service';

describe('Component Tests', () => {
    describe('StationMySuffix Management Delete Component', () => {
        let comp: StationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<StationMySuffixDeleteDialogComponent>;
        let service: StationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [RailwaysTestModule],
                declarations: [StationMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(StationMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StationMySuffixService);
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
