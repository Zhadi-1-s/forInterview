import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../../interfaces/book';


@Component({
  selector: 'app-book-insert',
  standalone: true,
  imports: [],
  templateUrl: './book-insert.component.html',
  styleUrl: './book-insert.component.scss'
})
export class BookInsertComponent {

  bookForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private bookService: BookService) {}

 onSubmit() {
    if (this.bookForm.valid) {
      const formValue = this.bookForm.value;

      const newBook: Book = {
        id: uuidv4(),
        title: formValue.title ?? '',
        author: formValue.author ?? ''
      };

      this.bookService.addBook(newBook);
      this.bookForm.reset();
    }
  }

}
