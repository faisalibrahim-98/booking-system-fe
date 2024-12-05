import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeys } from '../shared.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string | null = '';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getToken(): void {
    this.token = this.localStorageService.getItem(LocalStorageKeys.token);
  }

  async login(userBody: Record<string, unknown>): Promise<any> {
    try {
      return lastValueFrom(
        this.http.post(`http://localhost:3000/login`, userBody)
      );
    } catch {
      return {};
    }
  }

  async signup(userBody: Record<string, unknown>) {
    try {
      return (await lastValueFrom(
        this.http.post(`http://localhost:3000/signup`, userBody)
      )) as any;
    } catch {
      return {};
    }
  }

  async getUserData(id: string): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.get(`http://localhost:3000/account/${id}`, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  async logout(userBody: Record<string, unknown>) {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      this.localStorageService.removeItem(LocalStorageKeys.token);
      this.token = '';

      return (await lastValueFrom(
        this.http.post(`http://localhost:3000/logout`, userBody, { headers })
      )) as any;
    } catch {
      return {};
    }
  }

  async updateUser(userBody: Record<string, unknown>) {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return (await lastValueFrom(
        this.http.patch(`http://localhost:3000/account/me`, userBody, {
          headers,
        })
      )) as any;
    } catch {
      return {};
    }
  }

  async deleteUser(userBody: any) {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      await lastValueFrom(
        this.http.post(`http://localhost:3000/account/delete`, userBody, {
          headers,
        })
      );
    } catch {}
  }

  async getAllStaffData(): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.get(`http://localhost:3000/staff`, { headers })
      ) as any;
    } catch {
      return {};
    }
  }
}
