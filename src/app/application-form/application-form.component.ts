import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent {
  
  volunteerType: string | undefined;
  availability: string | undefined;
  @Input() service='choose'
  voluntaryServiceAreas: string | undefined;
  submitForm() {
    // Handle form submission logic here
    console.log("Form submitted!");
  }

}
