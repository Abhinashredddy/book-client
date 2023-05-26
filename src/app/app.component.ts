import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = {
    title: '',
    author: '',
    genre: '',
    publishedYear: 0,
  };
  selectedBook: Book | null = null;

  constructor(private bookService: BookService) {
    this.getBooks();
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBook().subscribe((books) => (this.books = books));
  }

  addBook(): void {
    this.bookService.addBook(this.newBook).subscribe(() => {
      this.getBooks();
      this.newBook = {
        title: '',
        author: '',
        genre: '',
        publishedYear: 0,
      };
    });
  }

  updateBook(book: Book) {
    if (book._id) {
      this.bookService.updateBook(book._id, book).subscribe(
        (updatedBook) => {
          const index = this.books.findIndex((p) => p._id === updatedBook._id);
          if (index !== -1) {
            this.books[index] = updatedBook;
          }
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }

  deleteBook(bookId: string): void {
    this.bookService.deleteBook(bookId).subscribe(() => this.getBooks());
  }
}
