import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://www.voltacores.com/api/getData';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  saveEmployees(data: any): Observable<any> {
    return this.http.post(`https://www.voltacores.com/api/saveWorkerData`, data);
  }
}
