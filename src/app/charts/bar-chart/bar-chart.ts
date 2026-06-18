import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
    ApexNonAxisChartSeries,
    ApexChart,
    ApexResponsive,
    NgApexchartsModule
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    responsive: ApexResponsive[];
};

@Component({
    selector: 'app-bar-chart',
    imports: [
        CommonModule, 
        NgApexchartsModule,
        MatCardModule, 
        MatButtonModule
    ],
    templateUrl: './bar-chart.html',
    styleUrl: './bar-chart.scss',
})
export class BarChart implements OnChanges {
    @Input() data: any;
    chartOptions: any;

    ngOnChanges() {
        if (!this.data) return;
        const series = [{ name: 'Value', data: this.data.map((x: any) => x.value) }];

        this.chartOptions = {
            series,
            chart: {
                type: 'bar',
                height: 350
            },
            xaxis: {
                categories: this.data.map((x: any) => x.name)
            }
        };
    }
}
