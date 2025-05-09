import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://34.170.111.182:8080/getData';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  saveEmployees(data: any): Observable<any> {
    return this.http.post(`http://34.170.111.182:8080/saveWorkerData`, data);
  }
}
