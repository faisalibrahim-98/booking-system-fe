import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '../shared.enum';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  token: string | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  async rateAllStaff(body: any): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.post(`http://localhost:3000/rateAll`, body, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  rateIndividualStaff(body: any) {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.post(`http://localhost:3000/rateIndividual`, body, {
          headers,
        })
      ) as any;
    } catch {
      return {};
    }
  }

  getToken(): void {
    this.token = this.localStorageService.getItem(LocalStorageKeys.token);
  }
}
