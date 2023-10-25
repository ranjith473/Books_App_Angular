import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/services/books.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  providers: [MessageService]
})
export class EditBookComponent implements OnInit {
  bookForm!: FormGroup;
  bookId: any
  constructor(private formBuilder: FormBuilder,
    private booksService: BooksService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: [''],
      publishedYear: [null],
      ISBN: [''],
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.bookId = params
    })
    this.getBookDetails()
  }
  get form() {
    return this.bookForm.controls;
  }
  getBookDetails() {
    this.booksService.getBookById(this.bookId).subscribe(result => {

      this.bookForm.patchValue({
        title: result.details.title,
        author: result.details.author,
        description: result.details.description,
        publishedYear: new Date(result.details.publishedYear),
        ISBN: result.details.ISBN,
      })
      this.form['ISBN'].disable();
    })
  }
  editBook(data: any) {
    let req = this.bookForm.getRawValue()
    console.log(this.bookForm.getRawValue())
    this.booksService.updateBook(req).subscribe(result => {
      let msg = result.message;
      if (result.status == 200) {
        Swal.fire({
          text: msg,
          icon: 'success',
          timer: 1500,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        })
        this.getBookDetails()
      }


    })
  }

  onClickClose() {
    this.router.navigate([''])
  }
}
