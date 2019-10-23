import { IStationTrainMySuffix } from 'app/shared/model/station-train-my-suffix.model';
import { ITicketMySuffix } from 'app/shared/model/ticket-my-suffix.model';

export interface ITrainMySuffix {
    id?: number;
    countPassengers?: number;
    numberTrain?: number;
    stationTrains?: IStationTrainMySuffix[];
    tickets?: ITicketMySuffix[];
}

export class TrainMySuffix implements ITrainMySuffix {
    constructor(
        public id?: number,
        public countPassengers?: number,
        public numberTrain?: number,
        public stationTrains?: IStationTrainMySuffix[],
        public tickets?: ITicketMySuffix[]
    ) {}
}
