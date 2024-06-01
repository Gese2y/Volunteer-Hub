import { Component } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component {
  constructor(private modalService: NgbModal,
    private router: Router
  ) {
  }
  goToBack() {
    window.location.href = 'http://redc.xokait.com.et/en-us/Membership/volunteer';
  }
  prevTab(tabGroup: MatTabGroup): void {
    if (tabGroup?.selectedIndex != null) {
      const newIndex = tabGroup.selectedIndex - 1;
      tabGroup.selectedIndex = newIndex < 0 ? tabGroup._tabs.length - 1 : newIndex;
    }
  }
  imageUrl = '../assets/images/avatar3.jpg';
  imageUrl2 = '../assets/images/avatar1.png';
  imageUrl3 = '../assets/images/avatar2.png';

  nextTab(tabGroup: MatTabGroup): void {
    if (tabGroup?.selectedIndex != null) {
      const newIndex = tabGroup.selectedIndex + 1;
      tabGroup.selectedIndex = newIndex >= tabGroup._tabs.length ? 0 : newIndex;
    }
  }
}
