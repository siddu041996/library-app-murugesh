import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppConfig } from 'src/app/app-config';
import { All_StudentsList } from '../../../models/studentlist.mock'

@Injectable({
  providedIn: 'root'
})
export class StudentListService {

  private baseUrl = 'http://localhost:8080/api/enrollments/';  

  constructor(private http: HttpClient) { }

  getStudentList(status: string): Observable<any> {  
    const params = { filter: status };
    // return this.http.get(`${this.baseUrl}`);
    // return this.http.get(`${AppConfig.endpoints.StudentList}`, { params: params });
    // return this.http.get("../Mock-data/getStudentlist.json ");
    // return of(All_StudentsList) 
    return this.http.get(`${AppConfig.endpoints.StudentList}`);
  }  
  
  createStudent(student: object): Observable<object> {  
    return this.http.post(`${this.baseUrl}`+'save-student', student);  
  }  
  
  deleteStudent(id: number): Observable<any> {  
    return this.http.delete(`${this.baseUrl}/delete-student/${id}`, { responseType: 'text' });  
  }  
  
  getStudent(id: number): Observable<Object> {  
    return this.http.get(`${this.baseUrl}/student/${id}`);  
  }  
  
  updateStudent(id: number, value: any): Observable<Object> {  
    return this.http.post(`${this.baseUrl}/update-student/${id}`, value);  
  } 
}
