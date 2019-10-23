import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RailwaysSharedModule } from 'app/shared/shared.module';
import { StationTrainMySuffixComponent } from './station-train-my-suffix.component';
import { StationTrainMySuffixDetailComponent } from './station-train-my-suffix-detail.component';
import { StationTrainMySuffixUpdateComponent } from './station-train-my-suffix-update.component';
import {
    StationTrainMySuffixDeletePopupComponent,
    StationTrainMySuffixDeleteDialogComponent
} from './station-train-my-suffix-delete-dialog.component';
import { stationTrainRoute, stationTrainPopupRoute } from './station-train-my-suffix.route';

const ENTITY_STATES = [...stationTrainRoute, ...stationTrainPopupRoute];

@NgModule({
    imports: [RailwaysSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StationTrainMySuffixComponent,
        StationTrainMySuffixDetailComponent,
        StationTrainMySuffixUpdateComponent,
        StationTrainMySuffixDeleteDialogComponent,
        StationTrainMySuffixDeletePopupComponent
    ],
    entryComponents: [StationTrainMySuffixDeleteDialogComponent]
})
export class RailwaysStationTrainMySuffixModule {}
