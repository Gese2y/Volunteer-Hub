import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MenuItem, MessageService } from 'primeng/api';
import { LangaugeDialogComponent } from '../langauge-dialog/langauge-dialog.component';
import { ServiceServiceService } from '../service-service.service';
import { Router } from '@angular/router';
// import intlTelInput from 'intl-tel-input';

@Component({ 
  selector: 'app-volunteer-form',
  templateUrl: './volunteer-form.component.html',
  styleUrls: ['./volunteer-form.component.css']
})
export class VolunteerFormComponent {
  @Output() updateClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevClicked: EventEmitter<void> = new EventEmitter<void>();
  maxDate = new Date();
  @ViewChild('phoneInput', { static: true })
  animal: string | undefined; 
  name: string | undefined; 
  Lleastning: string | undefined;
  Lwriting:string | undefined;
  LSpeaking:string | undefined;
  phoneInput!: ElementRef;
  panelOpenState = true;
  // dataArray: Data[] = [];
  @Input() custid:any
  countries: any[] = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  panelOpenState2 = true;
  panelOpenState3 = true;// Define maxDate property with current date
  startDate: Date = new Date();
  items: MenuItem[] | undefined;
  public address: any;
  volunteer: any = {}; 
  Volunteership: Volunteership={} as Volunteership
  VolunteershipLists: Volunteership[] = [];
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  colorControl = new FormControl('Nationality' as ThemePalette);
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  errorMessage = '';
  selectedCountry: string | undefined;
  selectedAddress: string | undefined;
  data: any;
  Language: any;
  isProfession: boolean | undefined;
  isLangData: boolean | undefined;
  isEdit: boolean=false;
  constructor(private _formBuilder: FormBuilder,private http: HttpClient,
    public dialog: MatDialog,
    private _toast: MessageService,
    private service: ServiceServiceService,
    private router: Router
  ) {}
  ngOnInit() {
    
    this.fetchCountries();
    this.address=[{name:'Regional',value:'regional'},{name:'Non Regional',value:'non_regional'}]
   
    
    this.items = [
        {
            label: 'Personal',
            routerLink: 'personal'
        },
        {
            label: 'Seat',
            routerLink: 'seat'
        },
        {
            label: 'Payment',
            routerLink: 'payment'
        },
        {
            label: 'Confirmation',
            routerLink: 'confirmation'
        }
    ];
}
getVolunteership(){
  this.service.getVolunteer().subscribe((response:any)=>{
    this.VolunteershipLists=response.procVolunteerships.filter((value:any)=>value.customer_id==this.custid)
  })
}
updateErrorMessage() {
  if (this.email.hasError('required')) {
    this.errorMessage = 'You must enter a value';
  } else if (this.email.hasError('email')) {
    this.errorMessage = 'Not a valid email';
  } else {
    this.errorMessage = '';
  }
}
ngAfterViewInit(): void {
  const input = this.phoneInput.nativeElement;
  // intlTelInput(input);
}

ngOnChanges(){
  this.Volunteership.customer_id=this.custid
  this.getVolunteership()
}
  submitForm() {
    // This method will handle the form submission
    console.log('Form submitted!');
  }
  onSelectCountry(country: string) {
    this.selectedCountry = country;
    console.log('Selected country:', country);
  }
  onSelectAddress(address: string) {
    this.selectedAddress = address;
    console.log('Selected address:', address);
  }
  onSelectProfession(prof: string) {
    if(prof=='professional'){

      this.isProfession = true;
    }
    else{
      this.isProfession = false
    }
    console.log('Selected address:', prof);
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  showToast(type: string, title: string, message: string) {
    let messageConfig = {
      severity: type,
      summary: title,
      detail: message
    }

    this._toast.add(messageConfig);
  }
  next(){
    this.updateClicked.emit();
  }
  prev(){
    this.prevClicked.emit();
  }
  openDialog(): void { 
    let dialogRef = this.dialog.open(LangaugeDialogComponent, { 
      width: '700px', 
      data: { Language: this.Language, animal: this.animal,Lleastning:this.Lleastning } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      // this.animal = result; 
      this.data=result
      this.isLangData=true
      // this.dataArray.push(result);
console.log('testttttt',result);

    }); 
  } 
  onSelectLanguage(langauge: string) {
    this.Language = langauge;
    console.log('Selected address:', langauge);
  }
  fetchCountries(): void {
    console.log('addreaaa',this.address,this.items);
    this.http.get<any[]>('https://restcountries.com/v3.1/all')
      .subscribe(
        (countries: any[]) => {
          this.countries = countries.map(country => ({
            name: country.name.common,
            flagUrl: country.flags.svg // or country.flags.png
          }));
  
          this.countries.sort((a, b) => a.name.localeCompare(b.name));

        // Find Ethiopia and move it to the beginning of the array
        const ethiopiaIndex = this.countries.findIndex(country => country.name === 'Ethiopia');
        if (ethiopiaIndex !== -1) {
          const ethiopia = this.countries.splice(ethiopiaIndex, 1)[0];
          this.countries.unshift(ethiopia);
        }
          console.log('this.countries', this.countries);
        },
        (error) => {
          console.error('Error fetching countries:', error);
        }
      ); 
  }
  Add(){
    this.isEdit=false
  this.Volunteership={
     id:'',
           customer_id:'',
           service_Area:'',
           avaialability_in_day:'',
           avialability_in_our:'',
           reason:'',
           comment:'',
  }
  }
  save(){
    this.Volunteership.id=generateGuid()
    this.service.insertVolunteer(this.Volunteership).subscribe((res:any)=>{
this.getVolunteership()
this.isEdit=true
      this.showToast('success', 'success', 'inserted!');
    })
    console.log(this.Volunteership);
    // this.showToast('error', 'error', `unable to add industry! `);
       
        
  }
  onRowUnselect() {
    this.isEdit=false
    this.Volunteership={
       id:'',
             customer_id:'',
             service_Area:'',
             avaialability_in_day:'',
             avialability_in_our:'',
             reason:'',
             comment:'',
    }
  }
  delete(){
    this.service.deletetVolunteer(this.Volunteership.id).subscribe((res:any)=>{
      this.getVolunteership()
      this.showToast('success', 'success', 'deleted!');
    })
  }
  edit(data:any){
    this.Volunteership=data.data
    console.log('datttttt',data);
    this.isEdit=true
  }
  onRowSelect(event:any){
console.log('dataaaaa',event);

  }
  update(){
    this.service.updateVolunteer(this.Volunteership).subscribe((res:any)=>{
      this.getVolunteership()
      this.showToast('success', 'success', 'edited!');
    })
  }
  goToorgComponent() {
    this.router.navigate(['/Membership/organization']);
  }
}
export class Volunteership{

  id?:any;
           customer_id?:any;
           service_Area?:any;
           avaialability_in_day?:any;
           avialability_in_our?:any;
           reason?:any;
           comment?:any;
 }
 function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}