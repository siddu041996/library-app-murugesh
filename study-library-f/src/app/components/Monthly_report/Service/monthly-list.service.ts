import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { All_StudentsList } from '../../../models/studentlist.mock'

@Injectable({
  providedIn: 'root'
})
export class MonthlyListService {

  private baseUrl = 'http://localhost:8080/api/';  

  constructor(private http: HttpClient) { }
  
  getMonthlyStudents(month: any): Observable<Object> {  
    // return this.http.get(`${this.baseUrl}student/${month}`);  
    return of(All_StudentsList) 
  } 


  // not used

  getStudentList(): Observable<any> {  
    // return this.http.get(`${this.baseUrl}`+'students-list');
    // return this.http.get("../Mock-data/getStudentlist.json ");
    return of(All_StudentsList) 
  }  
  
  createStudent(student: object): Observable<object> {  
    return this.http.post(`${this.baseUrl}`+'save-student', student);  
  }  
  
  deleteStudent(id: number): Observable<any> {  
    return this.http.delete(`${this.baseUrl}/delete-student/${id}`, { responseType: 'text' });  
  }   
  
  updateStudent(id: number, value: any): Observable<Object> {  
    return this.http.post(`${this.baseUrl}/update-student/${id}`, value);  
  } 
}
