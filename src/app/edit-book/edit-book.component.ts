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
  bookForm!: FormGroup ;
  bookId:any
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
    // this.bookForm.get('ISBN')?.disable();
    
    this.activatedRoute.queryParams.subscribe(params => {
      this.bookId=params
    })
    console.log("ID",this.bookId)
    this.getBookDetails()
  }
  get form() {
    return this.bookForm.controls;
}
  getBookDetails(){
    this.booksService.getBookById(this.bookId).subscribe(result => {
      console.log("details",result.details)

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
  editBook(data:any) {
  //   let req={
  //     "title":data.title,
  //     "author":data.author,
  //     "description":data.description,
  //     "publishedYear":new Date(data.publishedYear),
  //     "ISBN":data.ISBN,
  // }
  let req=this.bookForm.getRawValue()
  console.log(this.bookForm.getRawValue())
    this.booksService.updateBook(req).subscribe(result => {
      // this.books=result.details
      console.log("RESULT",result)
      this.router.navigate([''])
      
     })
  }

  onClickClose(){
    this.router.navigate([''])
  }
}
