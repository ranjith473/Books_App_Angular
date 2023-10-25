import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private booksService: BooksService) { }

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
    let req = {
      "title": data.title,
      "author": data.author,
      "description": data.author,
      "publishedYear": data.publishedYear.getFullYear(),
      "ISBN": data.ISBN,
    }
    this.booksService.addBook(req).subscribe(result => {
    })
  }

}
