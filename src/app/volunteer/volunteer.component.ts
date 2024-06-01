import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
  form: FormGroup;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the form
    this.form = this.fb.group({
      comment: [null, Validators.required],
      verified: [false, Validators.requiredTrue]
    });
  }

  imageUrl = '../assets/images/avatar3.jpg';
  imageUrl2 = '../assets/images/avatar1.png';
  imageUrl3 = '../assets/images/avatar2.png';

  goToBack() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {}

  submitForm() {
    if (this.form.valid) {
      // Handle form submission
      console.log('Form Submitted', this.form.value);
    }
  }
}
