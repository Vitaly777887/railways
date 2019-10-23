import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RailwaysSharedModule } from 'app/shared/shared.module';
import { StationMySuffixComponent } from './station-my-suffix.component';
import { StationMySuffixDetailComponent } from './station-my-suffix-detail.component';
import { StationMySuffixUpdateComponent } from './station-my-suffix-update.component';
import { StationMySuffixDeletePopupComponent, StationMySuffixDeleteDialogComponent } from './station-my-suffix-delete-dialog.component';
import { stationRoute, stationPopupRoute } from './station-my-suffix.route';

const ENTITY_STATES = [...stationRoute, ...stationPopupRoute];

@NgModule({
    imports: [RailwaysSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StationMySuffixComponent,
        StationMySuffixDetailComponent,
        StationMySuffixUpdateComponent,
        StationMySuffixDeleteDialogComponent,
        StationMySuffixDeletePopupComponent
    ],
    entryComponents: [StationMySuffixDeleteDialogComponent]
})
export class RailwaysStationMySuffixModule {}
