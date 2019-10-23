import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RailwaysSharedModule } from 'app/shared/shared.module';
import { TrainMySuffixComponent } from './train-my-suffix.component';
import { TrainMySuffixDetailComponent } from './train-my-suffix-detail.component';
import { TrainMySuffixUpdateComponent } from './train-my-suffix-update.component';
import { TrainMySuffixDeletePopupComponent, TrainMySuffixDeleteDialogComponent } from './train-my-suffix-delete-dialog.component';
import { trainRoute, trainPopupRoute } from './train-my-suffix.route';

const ENTITY_STATES = [...trainRoute, ...trainPopupRoute];

@NgModule({
    imports: [RailwaysSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TrainMySuffixComponent,
        TrainMySuffixDetailComponent,
        TrainMySuffixUpdateComponent,
        TrainMySuffixDeleteDialogComponent,
        TrainMySuffixDeletePopupComponent
    ],
    entryComponents: [TrainMySuffixDeleteDialogComponent]
})
export class RailwaysTrainMySuffixModule {}
