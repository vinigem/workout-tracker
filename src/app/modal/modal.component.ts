import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'modal',
    template: `
        <div id="modal" class="modal fade" [ngClass]="show ? 'in': ''" role="dialog" *ngIf="show">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" (click)="close()"><i class="fa fa-times"></i></button>
                        <h4 class="modal-title" *ngIf="header">{{header}}</h4>
                    </div>
                    <div class="modal-body">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop fade in" *ngIf="show"></div>
    `
})

export class ModalComponent {

    @Input('header') header: string;
    @Input('show') show: boolean;
    @Output() showChange = new EventEmitter<boolean>();



    close(): void{
        this.show = false;
        this.showChange.emit(this.show);
    }

}