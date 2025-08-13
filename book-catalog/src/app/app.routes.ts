import { Routes } from '@angular/router';
import { MainComponent } from './common/pages/main/main.component';
import { BookInsertComponent } from './common/pages/book-insert/book-insert.component';
import { BookPageComponent } from './common/pages/book-page/book-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    { path: 'book-insert', component: BookInsertComponent },
    { path: 'book-page/:id', component: BookPageComponent },
    { path: '**', redirectTo: 'main' }
];
