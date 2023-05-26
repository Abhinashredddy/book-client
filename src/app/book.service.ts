import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getBook(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Book>(url, book);
  }

  deleteBook(bookId: string): Observable<any> {
    const url = `${this.apiUrl}/${bookId}`;
    return this.http.delete(url);
  }
}
