import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { FloatLabelType } from '@angular/material/form-field';
import { MenuItem, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
// import { ServiceServiceService } from '../../service-service.service';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ServiceServiceService } from '../service-service.service';
// import intlTelInput from 'intl-tel-input';

@Component({ 
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent {
  maxDate = new Date();
  @ViewChild(MatStepper) stepper!: MatStepper;
  @ViewChild('phoneInput', { static: true })
  phoneInput!: ElementRef;
  panelOpenState = true;
  Volunteer: Volunteer={} as Volunteer
  countries: any[] = [];
  
  email = new FormControl('', [Validators.required, Validators.email]);
  panelOpenState2 = true;
  panelOpenState3 = true;// Define maxDate property with current date
  startDate: Date = new Date();
  items: MenuItem[] | undefined;
  public address: any;
  volunteer: any = {}; 
  firstFormGroup = this._formBuilder.group({
    firstCtrl: new FormControl(null),
  });
  colorControl = new FormControl('Nationality' as ThemePalette);
  secondFormGroup = this._formBuilder.group({
    secondCtrl: new FormControl(null),
  });
  @Output() updateClicked: EventEmitter<void> = new EventEmitter<void>();
  sectors: string[] = [
    'Healthcare',
    'Education',
    'Environment',
    'Technology',
    'Finance',
    'Agriculture',
    'Manufacturing',
    'Transportation',
    'Retail',
    'Non-Profit',
    'Energy',
    'Construction',
    'Telecommunications',
    'Tourism',
    'Hospitality',
    'Food Services',
    'Real Estate',
    'Media and Entertainment',
    'Government',
    'Defense',
    'Aerospace',
    'Automotive',
    'Chemicals',
    'Consulting',
    'Consumer Goods',
    'Insurance',
    'Legal',
    'Pharmaceuticals',
    'Public Relations',
    'Research and Development',
    'Sports',
    'Textiles',
    'Utilities',
    'Waste Management',
    'Wholesale Trade'
  ];
  // @Output() prevClicked: EventEmitter<void> = new EventEmitter<void>();
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  errorMessage = '';
  backgroundForm: FormGroup ;
  terms: FormGroup ;
  // orgForm: FormGroup;
  Organization: Organization={} as Organization
  orgTypes: string[] = ['Non-Profit', 'For-Profit', 'Government', 'NGO'];
  countriess: string[] = ['Ethiopia', 'Kenya', 'Uganda', 'Tanzania', 'Somalia'];
  selectedCountry: string | undefined;
  selectedAddress: string | undefined;
  image: string | undefined;
  regions = ['Amhara', 'Tigray', 'Gambela', 'Harar', 'Oromia', 'Sidama', 'Afar'];
  zones = ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4'];
  cities = ['Addis Ababa', 'Sheger', 'Dire Dawa'];
  subcities = ['Subcity 1', 'Subcity 2', 'Subcity 3'];
  userName: string | undefined;
  isUser: boolean | undefined;
  custid: any;
  documentupload: string | undefined;

  isEdit: boolean=false;
  isOrganization: boolean=true;
  isSubmitted: boolean=false;
  OrganizationRegSer: any;
  AppCode = "00000000-0000-0000-0000-000000000000";
  DocID: any;
  todoID: any;
  AppNo: any;
  taskID: any;
  ServiceId: any;
  isApproved: boolean=true;
  constructor(private _formBuilder: FormBuilder,private http: HttpClient,private fb: FormBuilder
    ,   private service: ServiceServiceService, private _toast: MessageService,private router: Router,
  ) {
    this.backgroundForm = new FormGroup({
      id: new FormControl(null),
      customer_id: new FormControl(null),
      name: new FormControl(null),
      organization_type: new FormControl(null),
      sector: new FormControl(null),
      contact_person: new FormControl(null),
      email: new FormControl(null),
      phone_number: new FormControl(null),
      country: new FormControl(null),
      address: new FormControl(null),
      region: new FormControl(null),
      zone: new FormControl(null),
      woreda: new FormControl(null),
      kebele: new FormControl(null),
      employee_size: new FormControl(null),
      branch: new FormControl(null),
      term_and_condition: new FormControl(null),
      owners_name: new FormControl(null),
      owner_phone_no: new FormControl(null),
      owner_email: new FormControl(null),
      website: new FormControl(null),
      social_media: new FormControl(null),
      is_approved: new FormControl(null),
    });
    this.terms= new FormGroup({
      agreeTerms: new FormControl(null)
    })
  }
  ngOnInit() {
    this.service.getOrganizationRegisterService().subscribe((services:any)=>{
      this.OrganizationRegSer=services.filter((value:any)=>value.service_code=='095785a2-0737-452d-9a3b-ecc3d1cbd988')
      console.log('services',services,this.OrganizationRegSer);
      // this.DocID=this.OrganizationRegSer[0].service_code
      this.ServiceId=this.OrganizationRegSer[0].service_code
      this.taskID=this.OrganizationRegSer[0].task_code
      this.router.navigate([`service/`+this.OrganizationRegSer[0].service_code]);
   
    })
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
      this.Volunteer=value.procCustomers[0]
      this.service.getOrganizationById(this.Volunteer.customer_ID).subscribe((res:any)=>{
        console.log('res.procOrganization_Details[0].is_approved',res.procOrganization_Details[0].is_approved);
        
          if(res.procOrganization_Details.length==0){
            this.backgroundForm.patchValue({
              id:this.Volunteer.customer_ID
            }) 
            this.custid=this.Volunteer.customer_ID
            console.log('datwwwwa',this.Volunteer);
            if(this.Volunteer.is_Represented==null||
              this.Volunteer.is_Represented==false&&this.Volunteer.applicant_First_Name_EN==null
            ){
             
              this.Volunteer.is_Represented=true
              this.custid=this.Volunteer.customer_ID
              this.service.update_data(this.Volunteer).subscribe((updateres:any)=>{
                console.log('resssss',updateres);
                // this.showToast('success', 'success', 'edited!');
                    })
              console.log(this.custid);
              console.log('this.Volunteer.photo',this.Volunteer);
            }else if(this.Volunteer.is_Represented==false){
              this.isOrganization=false
            }
          }else{
            if(res.procOrganization_Details[0].is_approved==false||res.procOrganization_Details[0].is_approved==null){
              this.isApproved=false
            }else{

              this.custid=this.Volunteer.customer_ID
            
              console.log('procOrganization_Details',res.procOrganization_Details);
              this.isEdit=true
              this.backgroundForm.patchValue({
                   id: res.procOrganization_Details[0].id,
                customer_id: res.procOrganization_Details[0].customer_id,
                name: res.procOrganization_Details[0].name,
                organization_type: res.procOrganization_Details[0].organization_type,
                sector: res.procOrganization_Details[0].sector,
                contact_person: res.procOrganization_Details[0].contact_person,
                email: res.procOrganization_Details[0].email,
                phone_number: res.procOrganization_Details[0].phone_number,
                country: res.procOrganization_Details[0].country,
                address: res.procOrganization_Details[0].address,
                region: res.procOrganization_Details[0].region,
                zone: res.procOrganization_Details[0].zone,
                woreda: res.procOrganization_Details[0].woreda,
                kebele: res.procOrganization_Details[0].kebele,
                employee_size: res.procOrganization_Details[0].employee_size,
                branch: res.procOrganization_Details[0].branch,
              })
            }
          }
        
      })
      
      if(this.Volunteer.photo==null){
        
        this.documentupload=this.image
      }else{
        // this.previewdocumnet(this.Volunteer.photo)
      }
      if(this.Volunteer.applicant_First_Name_EN==null){
        this.isEdit=false
      }else{
        this.isEdit=true
      }
    })
    // this.backgroundForm = this.fb.group({
    //   id: new FormControl(null),
    //   customer_id: new FormControl(null),
    //   name: new FormControl(null),
    //   organization_type: new FormControl(null),
    //   sector: new FormControl(null),
    //   contact_person: new FormControl(null),
    //   email: new FormControl(null),
    //   phone_number: new FormControl(null),
    //   country: new FormControl(null),
    //   address: new FormControl(null),
    //   region: new FormControl(null),
    //   zone: new FormControl(null),
    //   woreda: new FormControl(null),
    //   kebele: new FormControl(null),
    //   employee_size: new FormControl(null),
    //   branch: new FormControl(null),
    // });
    this.fetchCountries();
    this.address=[{name:'Regional',value:'regional'},{name:'Non Regional',value:'non_regional'}]
   
    this.image=environment.imageUrl10
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
moveToNextStep(): void {
  this.stepper.next();
  this.isSubmitted=true
  console.log('this.isSubmitted',this.isSubmitted);
  
}
prevClicked():void{
  this.stepper.previous()
}
submit(){
  this.isSubmitted=true
}
next(){
  this.updateClicked.emit();
}
prev(){
  // this.prevClicked.emit();
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
  this.backgroundForm.patchValue({
    id:this.Volunteer.customer_ID,  
    term_and_condition:this.terms.value['agreeTerms'],
    is_approved:false
  })
  this.Organization=this.backgroundForm.value
  console.log('testssss',this.Organization);
  this.service.insertOrganization(this.Organization).subscribe((res:any)=>{
    this.showToast('success', 'success', 'inserted!');
    this.service
    .saveFormm(
      "00000000-0000-0000-0000-000000000000",
      this.ServiceId,
      this.taskID,
      "1EFB0336-26C6-4BF1-AEB8-8DA0D4F7DBBB",
      JSON.stringify({}),
      this.DocID ? this.DocID : "00000000-0000-0000-0000-000000000000",
      this.todoID ? this.todoID : "00000000-0000-0000-0000-000000000000"
    )
    .subscribe(
      (response:any) => {
        console.log("save-from-response", response);
        // this.serviceService.disablefins=false;
        // this.disablefins = false;
        this.AppNo = response[0];
        this.DocID = response[1];
        if (this.todoID == undefined) {
          this.todoID = response[2];
        }

        // this.getAll();
        // this.cannxtto2 = false;
        this.showToast('success', 'success', 'saved!');
      },
      (error) => {
        console.log("save-form-error", error);
        //this.serviceService.disablefins=true;
        this.showToast('error', 'error', 'Something went wrong!');
        // const toast = this.notificationsService.error(
        //   "Error",
        //   "SomeThing Went Wrong"
        // );
      }
    );
  })
}
update(){
  this.backgroundForm.patchValue({
    term_and_condition:this.terms.value['agreeTerms'],
    is_approved:false
  })
  this.Organization=this.backgroundForm.value
this.service.updateOrganization(this.Organization).subscribe((res:any)=>{
  this.showToast('success', 'success', 'inserted!');
  
})

  // this.serviceService.jsonArrayData = this.convertJsonToArray(formData);
  // console.log(
  //   "save-form",
  //   this.serviceService.jsonArrayData
  // );
  this.service
    .saveFormm(
      "00000000-0000-0000-0000-000000000000",
      this.ServiceId,
      this.taskID,
      "1EFB0336-26C6-4BF1-AEB8-8DA0D4F7DBBB",
      JSON.stringify({}),
      this.DocID ? this.DocID : "00000000-0000-0000-0000-000000000000",
      this.todoID ? this.todoID : "00000000-0000-0000-0000-000000000000"
    )
    .subscribe(
      (response:any) => {
        console.log("save-from-response", response);
        // this.serviceService.disablefins=false;
        // this.disablefins = false;
        this.AppNo = response[0];
        this.DocID = response[1];
        if (this.todoID == undefined) {
          this.todoID = response[2];
        }

        // this.getAll();
        // this.cannxtto2 = false;
        this.showToast('success', 'success', 'saved!');
      },
      (error) => {
        console.log("save-form-error", error);
        //this.serviceService.disablefins=true;
        this.showToast('error', 'error', 'Something went wrong!');
        // const toast = this.notificationsService.error(
        //   "Error",
        //   "SomeThing Went Wrong"
        // );
      }
    );

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
// ngAfterViewInit(): void {
//   const input = this.phoneInput.nativeElement;
//   // intlTelInput(input);
// }
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

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  // onSubmit() {
  //   if (this.orgForm.valid) {
  //     console.log('Form Submitted', this.orgForm.value);
  //   }
  // }
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
  Submit(ruleid:any) {
    // this.Close();
    this.isSubmitted=true
    // this.disablefins = true;
    this.service
      .Submit(this.AppCode, this.DocID, this.todoID, ruleid)
      .subscribe(
        (message) => {
          if (message) {
            this.showToast('success', 'success', 'inserted!');
          } else {
            this.showToast('error', 'error', message);
          }
          console.info("submit :: ", message);
        },
        (error) => {
          if (error.status == "400") {
            this.showToast('error', 'error',error.error.InnerException.Errors[0].message);
            
          } else {
            this.showToast('error', 'error', 'SomeThing Went Wrong');
           
          }
          console.error("submit error :: ", error);
        }
      );
  }
  Close() {
    this.router.navigate(["task/MyTask"]);
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
export class Organization{


  
    id?: any;
    customer_id?: any;
    name?: any;
    organization_type?: any;
    sector?: any;
    contact_person?: any;
    email?: any;
    phone_number?: any;
    country?: any;
    address?: any;
    region?: any;
    zone?: any;
    woreda?: any;
    kebele?: any;
    employee_size?: 0;
    branch?: 0
    term_and_condition?: any
    owners_name?: any
    owner_phone_no?: any
    owner_email?: any
    website?: any
    social_media?: any
    is_approved?: any
  
 }
 function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}