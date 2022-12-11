import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  handleQuestionForm(contactForm: NgForm): void {
    if (contactForm.invalid) {
      return;
    }

    console.log(contactForm.value);
  }
}
