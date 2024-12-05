import { LocalStorageService } from './local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LocalStorageKeys } from '../shared.enum';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  token: string | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  async getUsers(query: any): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.post(`http://localhost:3000/search/staff`, query, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  getToken(): void {
    this.token = this.localStorageService.getItem(LocalStorageKeys.token);
  }
}
