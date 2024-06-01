import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
// @ts-ignore: Suppress implicit any error
const logo = window['Logo'];
console.log(logo); // Access the value of Logo variable

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  apply: boolean | undefined;
  @Output() close_table: any;
  @Output() service: any;
  constructor(private modalService: NgbModal,
    private router: Router
  ) {
  }
  imageUrl = environment.imageUrl;
  imageUrl2 = environment.imageUrl2;
  imageUrl3 = environment.imageUrl3;
  imageUrl4 = environment.imageUrl4;
  imageUrl5 = environment.imageUrl5;
  imageUrl6 = environment.imageUrl6;
  imageUrl7 = environment.imageUrl7;
  imageUrl8 = environment.imageUrl8;
  imageUrl9 = environment.imageUrl9;
  ngOnInit(): void {
  if(environment.imageUrl){
    console.log("logo","true");
    
  }else{
    console.log("logo","false");
    
  }
  console.log((window as any).myVariable,logo);
  }
  
  goToPersonComponent() {
    this.router.navigate(['/Membership/volunteer']);
  }
  goToorgComponent() {
    this.router.navigate(['/Membership/organization']);
  }
  clockvolu() {
    this.router.navigate(['/Membership/volunteer']);
  }
  public open(modal: any): void {
    this.modalService.open(modal);
  }
  popup(req:any,service:any){
req=='apply'?this.apply=true:this.apply=false
console.log('apply',this.apply);
this.service=service
this.close_table=true
  }
}
