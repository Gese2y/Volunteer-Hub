import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-langauge-dialog',
  templateUrl: './langauge-dialog.component.html',
  styleUrls: ['./langauge-dialog.component.css']
})
export class LangaugeDialogComponent {
  constructor( 
    public dialogRef: MatDialogRef<LangaugeDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { } 
  
  onCancel(): void { 
    this.dialogRef.close(); 
  } 
}
