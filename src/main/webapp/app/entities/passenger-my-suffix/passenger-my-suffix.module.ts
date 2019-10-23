import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RailwaysSharedModule } from 'app/shared/shared.module';
import { PassengerMySuffixComponent } from './passenger-my-suffix.component';
import { PassengerMySuffixDetailComponent } from './passenger-my-suffix-detail.component';
import { PassengerMySuffixUpdateComponent } from './passenger-my-suffix-update.component';
import {
    PassengerMySuffixDeletePopupComponent,
    PassengerMySuffixDeleteDialogComponent
} from './passenger-my-suffix-delete-dialog.component';
import { passengerRoute, passengerPopupRoute } from './passenger-my-suffix.route';

const ENTITY_STATES = [...passengerRoute, ...passengerPopupRoute];

@NgModule({
    imports: [RailwaysSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PassengerMySuffixComponent,
        PassengerMySuffixDetailComponent,
        PassengerMySuffixUpdateComponent,
        PassengerMySuffixDeleteDialogComponent,
        PassengerMySuffixDeletePopupComponent
    ],
    entryComponents: [PassengerMySuffixDeleteDialogComponent]
})
export class RailwaysPassengerMySuffixModule {}
