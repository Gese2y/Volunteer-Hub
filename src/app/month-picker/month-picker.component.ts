import { Component, Output, EventEmitter } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css']
})
export class MonthPickerComponent {

  @Output() monthSelected = new EventEmitter<number>();
  selectedMonth: number = new Date().getMonth();
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor() { }

  selectMonth(selectedDate: Date): void {
    const monthIndex = selectedDate.getMonth();
    this.selectedMonth = monthIndex;
    this.monthSelected.emit(monthIndex);
}

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const month = date.getMonth();
      return month === this.selectedMonth ? 'selected-month' : '';
    };
  }
}
