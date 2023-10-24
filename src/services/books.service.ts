import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl=environment.baseUrl
  constructor(private httpClient: HttpClient) { }

  getAllBooks() {
    const url = this.baseUrl + 'getAllBooks';
    return this.httpClient.get<any>(url)
  }

  getBookById(id:any){
    const url = this.baseUrl + 'getBookById';
    return this.httpClient.post<any>(url, id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  addBook(data: any) {
    const url = this.baseUrl + 'createBook';
    return this.httpClient.post<any>(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  updateBook(data: any){
    const url = this.baseUrl + 'updateBook';
    return this.httpClient.put<any>(url, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
  deleteBook(id: any){
    const url = this.baseUrl + 'deleteBook' +'/'+id;
    return this.httpClient.delete<any>(url);
  }
}
