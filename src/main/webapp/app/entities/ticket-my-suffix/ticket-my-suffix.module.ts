import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RailwaysSharedModule } from 'app/shared/shared.module';
import { TicketMySuffixComponent } from './ticket-my-suffix.component';
import { TicketMySuffixDetailComponent } from './ticket-my-suffix-detail.component';
import { TicketMySuffixUpdateComponent } from './ticket-my-suffix-update.component';
import { TicketMySuffixDeletePopupComponent, TicketMySuffixDeleteDialogComponent } from './ticket-my-suffix-delete-dialog.component';
import { ticketRoute, ticketPopupRoute } from './ticket-my-suffix.route';

const ENTITY_STATES = [...ticketRoute, ...ticketPopupRoute];

@NgModule({
    imports: [RailwaysSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TicketMySuffixComponent,
        TicketMySuffixDetailComponent,
        TicketMySuffixUpdateComponent,
        TicketMySuffixDeleteDialogComponent,
        TicketMySuffixDeletePopupComponent
    ],
    entryComponents: [TicketMySuffixDeleteDialogComponent]
})
export class RailwaysTicketMySuffixModule {}
