import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeys } from '../shared.enum';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SkillsService {
  token: string | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {}

  async getAllSkills(): Promise<any> {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.get(`http://localhost:3000/skills/all`, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  async createSkill(skillData: any) {
    try {
      this.getToken();

      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.token
      );

      return lastValueFrom(
        this.http.post(`http://localhost:3000/skill`, skillData, { headers })
      ) as any;
    } catch {
      return {};
    }
  }

  getToken(): void {
    this.token = this.localStorageService.getItem(LocalStorageKeys.token);
  }
}
