import axios from 'axios';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../environment/environment';
import { DonutChart } from '../charts/donut-chart/donut-chart';
import { BarChart } from '../charts/bar-chart/bar-chart';
import { Users } from '../tables/users/users';

@Component({
    selector: 'app-dashboard',
    imports: [
        BarChart,
        CommonModule, 
        DonutChart,
        FormsModule,
        Users,
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
    standalone: true
})

export class Dashboard implements OnInit {
    ngOnInit() {
        this.dashboard();
    }

    errorMessage = '';
    loading = false;
    data: any = null;
    chartDonut: any = null;
    chartBar: any = null;
    tableUsers: any = null;

    constructor() {}

    async dashboard() {
        this.loading = true;
        this.errorMessage = '';

        const url = `${environment.apiUrl}${environment.endpoints.dashboard}`;
        const token = localStorage.getItem('token');

        try {
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
            this.data = res.data;
            this.chartDonut = res.data.chartDonut;
            this.chartBar = res.data.chartBar;
            this.tableUsers = res.data.tableUsers;
        } catch (error: any) {
            this.errorMessage = error.response?.data?.message || 'Failed to fetch data';
            console.log('error: ' + JSON.stringify(error));
        } finally {
            this.loading = false;
        }
    }
}
