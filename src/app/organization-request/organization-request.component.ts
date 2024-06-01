import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LangaugeDialogComponent } from '../langauge-dialog/langauge-dialog.component';
import { FloatLabelType } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ThemePalette } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ServiceServiceService } from '../service-service.service';

@Component({
  selector: 'app-organization-request',
  templateUrl: './organization-request.component.html',
  styleUrls: ['./organization-request.component.css']
})
export class OrganizationRequestComponent {
  @Input() close_table:any
  @Input() services:any
  @Input() custid:any
  @Output() updateClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevClicked: EventEmitter<void> = new EventEmitter<void>();
  defaultZoomLevel: number = 0.54;
  maxDate = new Date();
  @ViewChild('phoneInput', { static: true })
  animal: string | undefined; 
  name: string | undefined; 
  Lleastning: string | undefined;
  Lwriting:string | undefined;
  LSpeaking:string | undefined;
  phoneInput!: ElementRef;
  panelOpenState = true;
  dataArray: Data[] = [];
  Request: Request={} as Request
  countries: any[] = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  panelOpenState2 = true;
  panelOpenState3 = true;// Define maxDate property with current date
  startDate: Date = new Date();
  items: MenuItem[] | undefined;
  public address: any;
  volunteer: any = {}; 
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
  backgroundForm: FormGroup ;
  Language: any;
  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  isProfession: boolean | undefined;
  isLangData: boolean | undefined;
  isEdit: boolean=false;
  doblimit: boolean=false;
  constructor(private _formBuilder: FormBuilder,private http: HttpClient,
    public dialog: MatDialog,
    private service: ServiceServiceService,
    private _toast: MessageService,
  ) {
    this.backgroundForm = new FormGroup({
      id: new FormControl(null),
      org_id: new FormControl(null),
      service_area: new FormControl(null),
      no_volunteer: new FormControl(0),
      no_day: new FormControl(0),
      start_date: new FormControl(null),
      end_date: new FormControl(null),
      required_skill: new FormControl(null),
      administrative_arrangment: new FormControl(null),
      qualification: new FormControl(null),
      comment: new FormControl(null)

      
    });
    
    
  }
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
next(){
  this.updateClicked.emit();
}
prev(){
  this.prevClicked.emit();
}
showToast(type: string, title: string, message: string) {
  let messageConfig = {
    severity: type,
    summary: title,
    detail: message
  }

  this._toast.add(messageConfig);
}
save(){
  this.Request=this.backgroundForm.value
  let selectedValues = this.backgroundForm.controls['administrative_arrangment'].value;
  let concatenatedValues = selectedValues.join(', ');
  this.Request.administrative_arrangment=concatenatedValues
  
  console.log('this.backgroundForm',concatenatedValues);
  this.service.insertRequest(this.Request).subscribe((value:any)=>{
    this.showToast('success', 'success', 'inserted!');
  })
}
update(){
  this.Request=this.backgroundForm.value
  let selectedValues = this.backgroundForm.controls['administrative_arrangment'].value;
  let concatenatedValues = selectedValues.join(', ');
  this.Request.administrative_arrangment=concatenatedValues
 if( this.Request.end_date< this.Request.start_date){
  this.doblimit=true
  
}else{
  this.doblimit=false
  console.log('start date is greater');
this.service.updateRequest(this.Request).subscribe((res:any)=>{
  this.showToast('success', 'success', 'inserted!');
})
}
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
  console.log('yyyyyy',this.custid);
  this.backgroundForm.patchValue({
    id:this.custid,
    org_id:this.custid
  })
  this.service.getRequestById(this.custid).subscribe((res:any)=>{
    let splitValues = res.procRequests[0].administrative_arrangment.split(', ');
    console.log('yttyuiuy',splitValues,res);
    
    this.backgroundForm.patchValue({
      id: res.procRequests[0].id,
      org_id: res.procRequests[0].org_id,
      service_area: res.procRequests[0].service_area,
      no_volunteer: res.procRequests[0].no_volunteer,
      no_day: res.procRequests[0].no_day,
      start_date: res.procRequests[0].start_date,
      end_date: res.procRequests[0].end_date,
      required_skill: res.procRequests[0].required_skill,
      administrative_arrangment: splitValues,
      qualification: res.procRequests[0].qualification,
      comment: res.procRequests[0].comment
    })
    this.isEdit=true
  })
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

  
  openDialog(): void { 
    let dialogRef = this.dialog.open(LangaugeDialogComponent, { 
      width: '700px', 
      data: { Language: this.Language, animal: this.animal,Lleastning:this.Lleastning } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      // this.animal = result; 
      this.data=result
      this.isLangData=true
      this.dataArray.push(result);
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
}
export interface Data {
  Language:string
  Lleastning: string;
  LSpeaking: string;
  Lwriting: string;
}
export class Request{


  
  id?:any;
  org_id?:any;
  service_area?:any;
  no_volunteer?: any;
  no_day?: any
  start_date?:any;
  end_date?:any;
  required_skill?:any;
  administrative_arrangment?:any;
  qualification?:any;
  comment?:any

}
function generateGuid() {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
}