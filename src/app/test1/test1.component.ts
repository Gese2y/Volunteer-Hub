import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component {
  constructor(private modalService: NgbModal,
    private router: Router
  ) {
  }
  goToBack() {
    window.location.href = 'http://redc.xokait.com.et/en-us/Membership/volunteer';
  }
}
