import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeys } from '../shared.enum';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ShiftService {
  token: string | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  async createShift(shiftBody: any): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.post(`http://localhost:3000/shift`, shiftBody, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  async getAllShift(): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.get(`http://localhost:3000/shifts/all`, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  async getShiftById(shiftId: string): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.get(`http://localhost:3000/shifts/${shiftId}`, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  async updateShift(
    id: string,
    shiftBody: Record<string, unknown>
  ): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.patch(`http://localhost:3000/updateShift/${id}`, shiftBody, {
          headers,
        })
      );
    } catch {
      return {};
    }
  }

  async applyShift(body: any): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.post(`http://localhost:3000/apply`, body, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  async payShift(shiftBody: any): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.post(`http://localhost:3000/pay`, shiftBody, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  async referUser(body: any): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.post(`http://localhost:3000/refer`, body, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  async getNotifications(userId: any): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.get(`http://localhost:3000/notifications/${userId}`, {
          headers,
        })
      ) as any;
    } catch {
      return {};
    }
  }

  removeNotification(body: any) {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.post(`http://localhost:3000/removeRefer`, body, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  getToken(): void {
    this.token = this.localStorageService.getItem(LocalStorageKeys.token);
  }
}
