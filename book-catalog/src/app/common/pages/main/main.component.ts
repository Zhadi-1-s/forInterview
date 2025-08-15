import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BookService} from '../../services/book.service';
import { Book } from '../../interfaces/book';
import { Observable,of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { startWith,debounceTime, distinctUntilChanged,switchMap } from 'rxjs';
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, 
            MatCardModule,
            MatGridListModule,
            MatSidenavModule,
            MatListModule,
            RouterModule,
            MatFormFieldModule,
            ReactiveFormsModule,
            MatIconModule,
            MatInputModule
          ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  books$!: Observable<Book[]>;
  showForm = false;

  searchControl = new FormControl('');
  filteredBooks$!: Observable<Book[]>;

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required]
  });

  constructor(private bookService: BookService, private fb: FormBuilder) {}



  ngOnInit() {

    this.books$ = this.bookService.getBooks();

    this.filteredBooks$ = this.searchControl.valueChanges.pipe(
    startWith(''), // сразу показать все книги
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(query => this.bookService.filterBooks(query || ''))
  );

  }

  trackById(index: number, book: Book) {
    return book.id;
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;

      const newBook: Book = {
        id: uuidv4(),
        title: formValue.title ?? '',
        author: formValue.author ?? ''
      };

      this.bookService.addBook(newBook); // добавляем книгу
      console.log('New book added:', newBook);
      this.bookForm.reset();
    }
  }
}
