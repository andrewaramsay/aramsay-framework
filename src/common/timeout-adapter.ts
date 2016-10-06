import { Injectable } from 'aramsay-injector';

@Injectable()
export class TimeoutAdapter {
    setTimeout(callback: Function, delay?: number, ...args: any[]): number {
        return setTimeout(callback, delay, ...args);
    }
}
