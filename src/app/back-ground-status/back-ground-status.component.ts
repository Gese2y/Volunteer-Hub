import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { MenuItem, MessageService } from 'primeng/api';
import { LangaugeDialogComponent } from '../langauge-dialog/langauge-dialog.component';
import { ServiceServiceService } from '../service-service.service';
// import intlTelInput from 'intl-tel-input';

@Component({ 
  selector: 'app-back-ground-status',
  templateUrl: './back-ground-status.component.html',
  styleUrls: ['./back-ground-status.component.css']
})
export class BackGroundStatusComponent {
  maxDate = new Date();
  @Output() updateClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() prevClicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() custid:any
  @ViewChild('phoneInput', { static: true })
  animal: string | undefined; 
  name: string | undefined; 
  leastening_skill: string | undefined;
  Lwriting:string | undefined;
  LSpeaking:string | undefined;
  phoneInput!: ElementRef;
  panelOpenState = true;
  dataArray: Data[] = [];
  dataArray1: Data[] = [];
  countries: any[] = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  panelOpenState2 = true;
  panelOpenState3 = true;// Define maxDate property with current date
  startDate: Date = new Date();
  items: MenuItem[] | undefined;
  public address: any;
  
  Background_status: Background_status={} as Background_status
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
  Language: any;
  isProfession: boolean | undefined;
  isLangData: boolean | undefined;
  isEdit: boolean=false;
  langId: string | undefined;
  speacking_skill: any;
  writing_skill: any;
  reading_skill: any;
  backgroundForm: FormGroup;
  isLangselected: boolean=true;
  constructor(private _formBuilder: FormBuilder,private http: HttpClient,
    public dialog: MatDialog,
    private service: ServiceServiceService,
    private _toast: MessageService,
  ) {
    this.backgroundForm = new FormGroup({
      id: new FormControl(null),
      education_status: new FormControl(null),
      field: new FormControl(null),
      education_level: new FormControl(null),
      occupational_responsibility: new FormControl(null),
      working_organization: new FormControl(null),
      experience: new FormControl(null),      
      skill: new FormControl(null),
      volunteer_experience: new FormControl(null)
    });
  }
  ngOnInit() {
    console.log('generateGuid',generateGuid());
    
    this.fetchCountries();
    // this.service.getBackgroundstat().subscribe((res:any)=>{
    //   console.log(res);
    console.log(this.custid);
    // })
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
updateErrorMessage() {
  if (this.email.hasError('required')) {
    this.errorMessage = 'You must enter a value';
  } else if (this.email.hasError('email')) {
    this.errorMessage = 'Not a valid email';
  } else {
    this.errorMessage = '';
  }
}
ngOnChanges(){
  console.log('this.custid',this.custid);
  // this.Background_status.id=this.custid
  this.service.getBackgroundstatById(this.custid).subscribe((res:any)=>{
    console.log('this.custid1',res,res.procBackground_statuss.length);
    if(res.procBackground_statuss.length!==0){
this.isEdit=true 
console.log('essssss',this.isEdit);

if(res.procBackground_statuss[0].education_status=='professional'){

  this.isProfession = true;
}
else{
  this.isProfession = false
}
      this.backgroundForm.patchValue({
        id:res.procBackground_statuss[0].id,
        education_status: res.procBackground_statuss[0].education_status,
        field: res.procBackground_statuss[0].field,
        education_level: res.procBackground_statuss[0].education_level,
        occupational_responsibility: res.procBackground_statuss[0].occupational_responsibility,
        working_organization: res.procBackground_statuss[0].working_organization,
        experience: res.procBackground_statuss[0].experience,      
        skill: res.procBackground_statuss[0].skill,
        volunteer_experience: res.procBackground_statuss[0].volunteer_experience
      })
      this.service.getland().subscribe((res:any)=>{
        this.dataArray1=res.procLanguage_skills.filter((value:any)=>value.customer_id==this.custid)
        this.isLangData=true
      })
    }else{
      this.isEdit=false
    }
  })
  this.Background_status = {
    id: null,
    education_status: null,
    field: null,
    education_level: null,
    occupational_responsibility: null,
    working_organization: null,
    skill: null,
    volunteer_experience: null,
    experience: null
    
    
  };
  }
ngAfterViewInit(): void {
  // const input = this.phoneInput.nativeElement;
  // console.log(this.custid);
  
  // intlTelInput(input);
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
      data: {
       
        id:generateGuid(),
        customer_id:this.custid,
        language: this.Language, 
        speacking_skill: this.speacking_skill
        ,writing_skill:this.writing_skill,
        reading_skill:this.reading_skill,
        leastening_skill:this.leastening_skill,
       } 
    }); 
  
    dialogRef.afterClosed().subscribe(result => { 
      // this.animal = result; 
      this.data=result
      this.isLangData=true
      this.langId = generateGuid();
      this.dataArray.push(result);
      this.dataArray1.push(result);
      if(this)
console.log('testttttt',this.dataArray);

    }); 
  } 
  onSelectLanguage(langauge: string) {
    this.Language = langauge;
    this.isLangselected=false
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
  showToast(type: string, title: string, message: string) {
    let messageConfig = {
      severity: type,
      summary: title,
      detail: message
    }

    this._toast.add(messageConfig);
  }
  save(){
    console.log('background',this.Background_status);
    this.service.insertBackstat_data(this.Background_status).subscribe((res:any)=>{
      this.service.insertLang(this.dataArray).subscribe((res:any)=>{
      this.showToast('success', 'success', 'inserted language!');

      })
      this.showToast('success', 'success', 'inserted!');
    })
  }
  next(){
    this.updateClicked.emit();
  }
  prev(){
    this.prevClicked.emit();
  }
  update(){
    
    this.Background_status=this.backgroundForm.value
    console.log('background',this.Background_status);
    this.service.updateBackstat_data(this.Background_status).subscribe((res:any)=>{
      this.dataArray.forEach((data) => {
        this.service.insertLang(data).subscribe(
            (res: any) => {
                this.showToast('success', 'Success', 'Inserted language!');
            },
            (error: any) => {
                this.showToast('error', 'Error', 'Failed to insert language!');
                console.error('Error inserting language:', error);
            }
        );
    });
    
      this.showToast('success', 'success', 'edited!');
    }, (error: any) => {
      this.showToast('error', 'Error', 'Failed to insert language!');
      console.error('Error inserting language:', error);
  })
  }
}
export interface Data {
  // Language:string
  // leastening_skill: string;
  // LSpeaking: string;
  // Lwriting: string;
  id?: any
  customer_id?: any
  language?: any
  speacking_skill?: any
  writing_skill?: any
  reading_skill?: any
  leastening_skill?: any
}
export class Background_status{
 id?:any
 education_status?:any;
 field?:any;
 education_level?:any;
 occupational_responsibility?:any;
 working_organization?:any;
 skill?:any;
 volunteer_experience?:any
 experience?:any
}
function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}
