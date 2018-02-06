import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
    selector: 'alert',
    template: `
    <div class="alert-box" [ngClass]="{'drop-shadow': show}">
      <div class="alert-message alert-{{type}}" *ngIf="show">
        <strong>{{message}}</strong>
      </div>
    </div>
  `,
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

    private alertTypes = ['info', 'warning', 'error', 'success'];
    private defaultType = 'info';
    private defaultTime = 3000;
    public show: boolean;
    public message: string;
    public type: string;
    private timeout: any;
    private alertSubscription: any;

    @HostListener('click') onClick() {
        this.hideAlert();
    }

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertSubscription = this.alertService.getAlert()
            .subscribe(alert => {
                if (alert && alert.message) {
                    this.message = alert.message;
                    this.type = this.alertTypes.indexOf(alert.type) !== -1 ? alert.type : this.defaultType;
                    const time = (alert.time && alert.time > 0) ? alert.time : this.defaultTime;
                    this.show = true;
                    this.timeout = setTimeout(() => { this.hideAlert(); }, time);
                }
            });
    }

    hideAlert(): void {
        this.show = false;
        this.resetAlert();
        this.alertService.removeAlert();
    }

    resetAlert(): void {
        this.message = null;
        this.type = null;
        clearTimeout(this.timeout);
    }

    ngOnDestroy() {
        this.alertSubscription.unsubscribe();
    }

}
