import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [CommonModule,MatSidenavModule,
              MatListModule],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss'
})
export class BookPageComponent implements OnInit {

  book:Book | undefined;

  constructor(private route : ActivatedRoute,private bookService:BookService){}
  
  ngOnInit(): void {
      const bookId = this.route.snapshot.paramMap.get('id');
      console.log('Selected book ID:', bookId);
      if (bookId) {
        this.bookService.getBooksById(bookId).subscribe(book => {
          this.book = book;
          console.log('Selected book:', this.book);
        });
      }
  }

}
