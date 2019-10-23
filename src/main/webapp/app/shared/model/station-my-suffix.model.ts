import { IStationTrainMySuffix } from 'app/shared/model/station-train-my-suffix.model';

export interface IStationMySuffix {
    id?: number;
    name?: string;
    stationTrains?: IStationTrainMySuffix[];
}

export class StationMySuffix implements IStationMySuffix {
    constructor(public id?: number, public name?: string, public stationTrains?: IStationTrainMySuffix[]) {}
}
