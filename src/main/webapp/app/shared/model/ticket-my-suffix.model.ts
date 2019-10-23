import { Moment } from 'moment';

export interface ITicketMySuffix {
    id?: number;
    registerDate?: Moment;
    passengerId?: number;
    trainName?: string;
    trainId?: number;
}

export class TicketMySuffix implements ITicketMySuffix {
    constructor(
        public id?: number,
        public registerDate?: Moment,
        public passengerId?: number,
        public trainName?: string,
        public trainId?: number
    ) {}
}
