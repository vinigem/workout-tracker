import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {

    private alert = new Subject<any>();
    private alertQueue = [];

    constructor() { }

    public getAlert(): Observable<any> {
        return this.alert.asObservable();
    }

    public addAlert(message: string, alertType?: string, time?: number): void {
        if (message && message.length > 0) {
            this.alertQueue.push({ 'message': message, 'type': alertType, 'time': time });
        }
        if (this.alertQueue.length === 1) {
            this.pushAlert();
        }
    }

    public removeAlert(): void {
        this.alertQueue.shift();
        this.pushAlert();
    }

    private pushAlert(): void {
        if (this.alertQueue.length > 0) {
            this.alert.next(this.alertQueue[0]);
        }
    }

}
