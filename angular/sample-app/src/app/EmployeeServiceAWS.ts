import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceAWS {
  private apiUrl = 'https://www.voltacores.com/api/getData';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get(`${this.apiUrl}`, { responseType: 'json' }) as Observable<Employee[]>;
  }

  saveEmployees(data: any): Observable<any> {
    return this.http.post(`https://www.voltacores.com/api/saveWorkerData`, data);
  }

  insertEmployees(data: any): Observable<any> {
    return this.http.post(`https://www.voltacores.com/api/insertWorkerData`, data);
  }
}
