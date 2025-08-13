import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../interfaces/book';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'assets/books.json';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }

  filterBooks(query: string): Observable<Book[]> {
    return this.getBooks().pipe(
      map(books => {
        const q = query.trim().toLowerCase();
        if (!q) return books;
        return books.filter(book =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q)
        );
      })
    );
  }
}
