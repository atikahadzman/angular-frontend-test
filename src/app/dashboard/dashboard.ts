import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../environment/environment';
import { DonutChart } from '../charts/donut-chart/donut-chart';
import { BarChart } from '../charts/bar-chart/bar-chart';
import { Users } from '../tables/users/users';

@Component({
    selector: 'app-dashboard',
    imports: [BarChart, CommonModule, DonutChart, FormsModule, Users],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.scss',
    standalone: true
})
export class Dashboard implements OnInit {
    constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {}

    errorMessage = '';
    loading = false;
    data: any = null;
    chartDonut: any = null;
    chartBar: any = null;
    tableUsers: any = null;

    ngOnInit() {
        this.dashboard();
    }

    dashboard() {
        this.loading = true;
        this.errorMessage = '';
        const token = localStorage.getItem('token');

          if (!token || token == '' || token == 'undefined') {
            this.router.navigate(['/login']);
            return;
        }


        const url = `${environment.apiUrl}${environment.endpoints.dashboard}`;
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

        this.http.get<any>(url, { headers }).pipe(
            catchError((err) => {
                this.errorMessage = err.error?.message || 'Failed to fetch data';
                return of(null);
            }),
            finalize(() => {
                this.loading = false;
                this.cdr.markForCheck(); // forces a clean CD pass after the async update
            })
        ).subscribe((res) => {
            if (res) {
                this.data = res;
                this.chartDonut = res.chartDonut;
                this.chartBar = res.chartBar;
                this.tableUsers = res.tableUsers;
            }
        });
    }
}