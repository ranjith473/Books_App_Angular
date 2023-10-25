import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/services/books.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private booksService: BooksService,
    private router: Router,) { }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      publishedYear: [null, Validators.required],
      ISBN: ['', Validators.required],
    });
  }
  get form() {
    return this.bookForm.controls;
  }
  addBook(data: any) {
    let req=this.bookForm.getRawValue()
    this.booksService.addBook(req).subscribe(result => {
      if (result.status == 200) {
        Swal.fire({
          text: 'Created Successfully',
          icon: 'success',
          timer: 2000,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        })
        this.bookForm.reset();
      }
    })
  }

  onClickClose() {
    this.router.navigate([''])
  }

}
