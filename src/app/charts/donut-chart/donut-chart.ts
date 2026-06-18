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
    selector: 'app-donut-chart',
    imports: [
        CommonModule, 
        NgApexchartsModule,
        MatCardModule, 
        MatButtonModule
    ],
    templateUrl: './donut-chart.html',
    styleUrl: './donut-chart.scss',
    standalone: true,
})

export class DonutChart implements OnChanges {
    @Input() data: any;
    chartOptions: any;

    ngOnChanges() {
        if (!this.data) return;

        const series = this.data.map((x: any) => x.value);
        const labels = this.data.map((x: any) => x.name);

        this.chartOptions = {
            series,
            chart: {
                type: 'donut',
                height: 350
            },
            labels
        };
    }
}
