import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../interfaces/book';
import { Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'assets/books.json';

  private books$ = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {

    this.loadBooks();
  }

  private loadBooks() {
    this.http.get<Book[]>('assets/books.json').subscribe(data => {
      this.books$.next(data);
    });
  }

  getBooks(): Observable<Book[]> {
    return this.books$.asObservable();
  }

  getBooksById(id: string): Observable<Book | undefined> {
    return this.getBooks().pipe(
      map(books => books.find(book => book.id === id))
    );
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

  addBook(newBook: Book): void {
    this.books$.next([...this.books$.getValue(), newBook]);

  }
}
