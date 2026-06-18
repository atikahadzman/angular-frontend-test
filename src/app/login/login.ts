import axios from 'axios';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';
// import { environment } from '../environment/environment.prod';

@Component({
    selector: 'app-login',
    imports: [
        CommonModule,
        MatButtonModule, 
        FormsModule,
    ],
    templateUrl: './login.html',
    styleUrl: './login.scss',
})
export class Login {
    username = '';
    password = '';
    errorMessage = '';
    loading = false;

    constructor(private router: Router) {}

    async login() {
        this.loading = true;
        this.errorMessage = '';

        try {
            const url = `${environment.apiUrl}${environment.endpoints.login}`;
            const response = await axios.post(url, {
                username: this.username,
                password: this.password
            });

            const token = response.data;
            if (token) {
                localStorage.setItem('token', token);
                this.router.navigate(['/dashboard']);
            }
        } catch (error: any) {
            this.errorMessage = error.response?.data?.message || 'Invalid username or password';
            console.log('error: ' + JSON.stringify(error));
        } finally {
            this.loading = false;
        }
    }
}
