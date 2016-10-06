import { Injectable } from 'aramsay-injector';
import { Moment } from 'moment';
import * as moment from 'moment';

@Injectable()
export class MomentAdapter {
    now(): Moment {
        return moment();
    }
}