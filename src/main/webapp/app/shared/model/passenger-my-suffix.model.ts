import { Moment } from 'moment';
import { ITicketMySuffix } from 'app/shared/model/ticket-my-suffix.model';

export interface IPassengerMySuffix {
    id?: number;
    name?: string;
    surname?: string;
    birthday?: Moment;
    tickets?: ITicketMySuffix[];
}

export class PassengerMySuffix implements IPassengerMySuffix {
    constructor(
        public id?: number,
        public name?: string,
        public surname?: string,
        public birthday?: Moment,
        public tickets?: ITicketMySuffix[]
    ) {}
}
