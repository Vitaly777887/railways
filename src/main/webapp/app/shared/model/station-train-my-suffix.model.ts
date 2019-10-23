import { Moment } from 'moment';

export interface IStationTrainMySuffix {
    id?: number;
    arrivalTime?: Moment;
    departureTime?: Moment;
    stationName?: string;
    stationId?: number;
    trainName?: string;
    trainId?: number;
}

export class StationTrainMySuffix implements IStationTrainMySuffix {
    constructor(
        public id?: number,
        public arrivalTime?: Moment,
        public departureTime?: Moment,
        public stationName?: string,
        public stationId?: number,
        public trainName?: string,
        public trainId?: number
    ) {}
}
