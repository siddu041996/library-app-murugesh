import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { All_StudentsList } from '../../../models/studentlist.mock';
import { AppConfig } from 'src/app/app-config';

@Injectable({
  providedIn: 'root'
})
export class AddStudentService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any> {  
    // return this.http.get(`${this.baseUrl}`+'students-list');
    return of(All_StudentsList) 
  }  
  
  createStudent(student: object): Observable<object> {  
    // return this.http.post(`${this.baseUrl}`+'save-student', student);  
    // return of(student) 
    return this.http.post(`${AppConfig.endpoints.SaveStudent}`, student);
  } 
  
  editStudent(id:number,student: object): Observable<object> {  
    return this.http.post(`${this.baseUrl}`+'edit-student/'+id, student);  
    // return of(student) 
  }  
  
  deleteStudent(id: number): Observable<any> {  
    return this.http.delete(`${this.baseUrl}/delete-student/${id}`, { responseType: 'text' });  
  }  
  
  getStudent(id: string): Observable<Object> {
    return this.http.get(`${AppConfig.endpoints.GetStudent}${id}`);
  }  
  
  updateStudent(id: number, value: any): Observable<Object> {  
    return this.http.post(`${this.baseUrl}/update-student/${id}`, value);  
  } 

  getSeatAllotmentList(): Observable<any> {  
    return this.http.get(`${AppConfig.endpoints.SeatAllotmentList}`);
  }  
  
  seatAllotment(studentID: number,student: object): Observable<object> {
    return this.http.post(`${AppConfig.endpoints.createSeatAllotment}` + studentID, student);
  } 
}
