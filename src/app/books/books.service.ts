import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './store/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http : HttpClient) { }

  getBooks(){
    return this.http.get<Book[]>(" http://localhost:3000/books");
  }
}
