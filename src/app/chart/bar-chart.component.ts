import { Component, Input, AfterViewInit } from '@angular/core';
import { ChartData } from './chart-data';
import * as Chart from 'chart.js';

const colors = ['#33FFF3', '#FFE633', '#3339FF', '#FF7133', '#5FBA6A', '#94CFF8', '#1B1D92'];

@Component({
    selector: 'barchart',
    template: '<canvas id="{{chartData.id}}" width="300" height="200"></canvas>'
})
export class BarChart implements AfterViewInit {

    @Input('chartData') chartData: ChartData;
    canvas: any;
    ctx: any;


    constructor() { }

    ngAfterViewInit() {
        this.canvas = document.getElementById(this.chartData.id);
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: this.chartData.labels,
                datasets: [{
                    label: this.chartData.label,
                    data: this.chartData.data,
                    borderWidth: 1,
                    backgroundColor: colors
                }]
            },

            options: {
                responsive: false,
                display: true,
                legend: {
                    labels: {
                        fontColor: "#000",
                        fontSize: 18
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "#000",
                            beginAtZero: true
                        },
                         gridLines: {
                            color: "#000",
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: "#000",
                        },
                        gridLines: {
                            color: "#000",
                        }
                    }]
                }
            }
        });
    }

}