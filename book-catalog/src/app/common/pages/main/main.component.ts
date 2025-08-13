import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookService} from '../../services/book.service';
import { Book } from '../../interfaces/book';
import { Observable,of } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private bookService: BookService) {

  }


  books$!: Observable<Book[]>;
  cols = 5;

  ngOnInit() {
   this.bookService.getBooks().subscribe(data => {
     console.log('Books loaded:', data);
     this.books$ = of(data);
   });

  }

 
}
