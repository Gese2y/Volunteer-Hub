import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { FloatLabelType } from '@angular/material/form-field';
import { MenuItem, MessageService } from 'primeng/api';
import { ServiceServiceService } from '../service-service.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatStepper } from '@angular/material/stepper';
// import intlTelInput from 'intl-tel-input';

@Component({ 
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent {
  maxDate = new Date();
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild('phoneInput', { static: true })
  phoneInput!: ElementRef;
  Volunteer: Volunteer={} as Volunteer
  panelOpenState = true;
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
  image: string | undefined;
  userName: string | undefined;
  custid: any;
  isUser: boolean | undefined;
  mimeType: any;
  fileupload: string | undefined;
  uploadedDocumnet: boolean | undefined;
  uploadcontract: boolean | undefined;
  documentupload: any;
  isEdit: boolean | undefined;
  isOrganization: boolean=true;
  doblimit: boolean=false;
  rights: FormGroup ;
  constructor(private _formBuilder: FormBuilder,private http: HttpClient,
    private service: ServiceServiceService,
    private router: Router,
    private _toast: MessageService,
    private sanitizer: DomSanitizer,
  ) {
    this.rights= new FormGroup({
      agreeRights: new FormControl(null)
    })
  }
  ngOnInit() {
    
    this.userName=environment._UserName
    console.log('userrrrrrr',this.userName);
    if(this.userName){

      if(this.userName==null || this.userName==undefined||this.userName=='@HttpContext.Current.User.Identity.Name'){
        this.isUser=true
      }else{
        this.isUser=false
      }
    }else{
      this.isUser=true
    }
    this.image=environment.imageUrl10
    this.documentupload=this.image
this.service.getcust(this.userName).subscribe((value:any)=>{
  console.log('data',value);
  this.Volunteer=value.procCustomers[0]
  this.custid=this.Volunteer.customer_ID
  console.log(this.custid);
  console.log('this.Volunteer.photo',this.Volunteer);
  if(this.Volunteer.is_Represented==null||
    this.Volunteer.is_Represented==false&&this.Volunteer.applicant_First_Name_EN==null
  ){
   
    // this.Volunteer.is_Represented=true
    this.custid=this.Volunteer.customer_ID
    this.service.update_data(this.Volunteer).subscribe((res:any)=>{
      console.log('resssss',res);
      // this.showToast('success', 'success', 'edited!');
          })
    console.log(this.custid);
    console.log('this.Volunteer.photo',this.Volunteer);
  }else if(this.Volunteer.is_Represented==true){
    this.isOrganization=false
  }
  if(this.Volunteer.photo==null){
    
    this.documentupload=this.image
  }else{
    this.previewdocumnet(this.Volunteer.photo)
  }
  if(this.Volunteer.applicant_First_Name_EN==null){
    this.isEdit=false
  }else{
    this.isEdit=true
  }
})
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

upload(event:any) {
    
  if(event.files[0].size > 200000){
    //  const toast = this.notificationsService.error('error', 'maximum file size is 3MB');
  }else{
    this.Uploader(event.files[0]);
    console.log('event', event);
    console.log('files', event.files); 
  }


}
moveToNextStep(): void {
  this.stepper.next();
}
prevClicked():void{
  this.stepper.previous()
}
Uploader(File: File) {
  console.log('File ', File);
  let base64file: string | ArrayBuffer | null;
  let fullbase64: string | null = null;
  const reader = new FileReader();
  reader.readAsDataURL(File);

  reader.addEventListener('loadend', (e) => {
    base64file = reader.result;

    if (typeof base64file === 'string') {
      fullbase64 = base64file;
      const re = /base64,/gi;
      base64file = base64file.replace(re, '');
      base64file = base64file.split(';')[1];

      let type = File.type !== '' ? File.type : this.extractExtensionFromFileName(File.name);
      let base64FileData = btoa(JSON.stringify({
        type,
        data: base64file
      }));
console.log('base64FileData',base64FileData);

      // const toast = this.notificationsService.success('Success', 'Uploaded successfully');
      this.Volunteer.photo = base64FileData;
      this.documentupload = base64FileData;
      this.previewdocumnet(base64FileData)
    } else {
      console.error('File could not be read as a string.');
    }
  });
}
extractExtensionFromFileName(fileName:any) {
  if (fileName) {
    let fileNameSegment = (fileName as string).split('.');
    return `application/${fileNameSegment[fileNameSegment.length - 1]}`;
  }
  return '';
}
previewdocumnet(file:any){

  try {
   
   let fileData = JSON.parse(window.atob(file));
    let { type, data } = fileData;
    this.mimeType=type
    this.fileupload= "data:" + type + ";base64, " + data;
    this.uploadedDocumnet=true
    this.uploadcontract=false
   
    this.documentupload= this.sanitizer.bypassSecurityTrustResourceUrl(
             this.fileupload
           );
    console.log(this.documentupload);
}
         catch (e) {
           console.error(e);
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
  showToast(type: string, title: string, message: string) {
    let messageConfig = {
      severity: type,
      summary: title,
      detail: message
    }

    this._toast.add(messageConfig);
  }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  onSubmit() {
    const today = new Date();
    const dob=this.Volunteer.created_Date
    // const dob = this.Volunteer.created_Date;
    if (dob) {
      const age = calculateAge(dob);
      console.log('Form submitted successfully', this.Volunteer.created_Date,'today:',today,age);
      if(age<12){
        this.doblimit=true
      }else{
        this.doblimit=false
            this.service.update_data(this.Volunteer).subscribe((res:any)=>{
        console.log('resssss',res);
        this.showToast('success', 'success', 'saved!');
            })
      }
      console.log(`Age: ${age}`);
    } else {
      console.error('Date of birth is not defined');
    }
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
  goToorgComponent() {
    this.router.navigate(['/Membership/volunteer']);
  }
}

export class Volunteer{
   customer_ID?: any;
  applicant_First_Name_AM?: string ;
  applicant_First_Name_EN?: string ;
  applicant_Middle_Name_AM?: string | null;
  applicant_Middle_Name_En?: string | null;
  applicant_Last_Name_AM?: string | null;
  applicant_Last_Name_EN?: string | null;
  applicant_Mother_Name_AM?: string | null;
  applicant_Mother_Name_EN?: string | null;
  tin?: string;
  gender?: any;
  sdP_ID?: string | null;
  wereda_ID?: string | null;
  email?: string;
  mobile_No?: string;
  photo?: string;
  home_Telephone?: string;
  house_No?: string | null;
  address?: string | null;
  kebele?: string | null;
  nationality?: string;
  residence_Country?: string;
  state_Region?: string;
  city?: string | null;
  passport_ID?: string;
  is_Active?: boolean;
  is_Represented?: boolean;
  parent_Customer_ID?: string | null;
  is_them?: boolean;
  customer_Type_ID?: number;
  is_Representative?: boolean;
  customer_Status?: number;
  created_By?: string | null;
  updated_By?: string | null;
  deleted_By?: string | null;
  is_Deleted?: boolean;
  created_Date?: string | null;
  updated_Date?: string | null;
  deleted_Date?: string | null;
  maritalStatus?: any;
}

function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}