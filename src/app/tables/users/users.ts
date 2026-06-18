import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

@Component({
    selector: 'app-users',
    imports: [ 
        CommonModule, 
        MatTableModule,
    ],
    templateUrl: './users.html',
    styleUrl: './users.scss',
    standalone: true
})

export class Users implements OnChanges {
    @Input() data: any[] = [];
    users: any[] = [];
    displayedColumns: string[] = ['index', 'firstName', 'lastName', 'username'];

    ngOnChanges(): void {
        this.users = this.data || [];
    }
}
