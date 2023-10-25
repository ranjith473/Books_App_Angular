import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/services/books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  providers: [MessageService]
})
export class BookListComponent implements OnInit {
  books: any = [];
  copyBooks: any;
  searchText: any
  showDialog: boolean = false;
  bookForm!: FormGroup;
  constructor(private booksService: BooksService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.searchText = ''
    this.getAllBooks();
  }
  onAddClick() {
    this.router.navigate(['/book'])
  }
  getAllBooks() {
    this.booksService.getAllBooks().subscribe(result => {
      this.books = result.details
      this.copyBooks = result.details
      console.log("BOOK", this.books)
    })
  }

  initializeBookForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      publishedYear: [null],
      ISBN: [''],
    });
  }

  onEditClick(isbn: any, id: any) {
    this.router.navigate(['/editBook'], { queryParams: { isbn } })

  }
  editBook(data: any) {
    let req = {
      "title": data.title,
      "author": data.author,
      "description": data.author,
      "publishedYear": data.publishedYear.getFullYear(),
      "ISBN": data.ISBN,
    }
    this.booksService.updateBook(req).subscribe(result => {
    })
  }

  deleteBook(BookData: any) {
    this.messageService.clear();
    let msg = `Are you sure you want to delete?`;
    Swal.fire({
      title: msg,
      showCancelButton: true,
      allowEscapeKey: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.booksService
          .deleteBook(BookData._id)
          .subscribe({
            next: (res: any) => {
              if (res.status == 200) {
                Swal.fire({
                  text: 'Deleted Successfully',
                  icon:'success',
                  timer:1500,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK'
                })
              }
            },
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    })
  }
  searchBooks() {
    this.books = this.copyBooks.filter((data: any) =>
      (data['title'] != null &&
        data['title']
          .toString()
          .toLowerCase()
          .indexOf(this.searchText.trim().toLowerCase()) !== -1) ||
      (data['description'] != null &&
        data['description']
          .toString()
          .toLowerCase()
          .indexOf(this.searchText.trim().toLowerCase()) !== -1) ||
      (data['author'] != null &&
        data['author']
          .toString()
          .toLowerCase()
          .indexOf(this.searchText.trim().toLowerCase()) !== -1) ||
      (data['ISBN'] != null &&
        data['ISBN']
          .toString()
          .toLowerCase()
          .indexOf(this.searchText.trim().toLowerCase()) !== -1)
    )

  }
}
