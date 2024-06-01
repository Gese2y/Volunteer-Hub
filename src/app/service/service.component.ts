import { Component, ElementRef, EventEmitter, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ServiceServiceService } from '../service-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  formcode: any;
  AppNo: any;
  Service_ID: any;
  SDP_ID: any;
  tskTyp: any;
  tskID: any;
  DocID: any;
  todoID: any;
  plotRegistrationFields: any;
  ID: number | undefined;
  prepareCertificateFields: any;
  se: any;
  eventTypes: any;
  RequerdDocs: any;
  updated: any;
  loading: boolean | undefined;
  licenceService: any;
  licenceData: any;
  Licence_Service_ID: any;
  AppCode: any;
  constructor(
    // private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    public serviceService: ServiceServiceService,
    private router: Router,
    // private notificationsService: NotificationsService,
    private sanitizer: DomSanitizer,
    // public ngxModal: NgxSmartModalService,
    private renderer: Renderer2,
    private el: ElementRef,
    // private dialogService: DialogService,
    // private networkService: NetworkMonitoringService
  ) {}
  ngOnInit() {
    // setInterval(() => {
    //   this.serviceService
    //     .getdbstatus("00000000-0000-0000-0000-000000000000")
    //     .subscribe((response: any) => {
    //       console.log("response", response);
    //       if (response == true) {
    //         this.okdb = true;
    //       } else {
    //         this.okdb = false;
    //       }
    //     });
    // }, 1000);
    // this.serviceService.getUserRole().subscribe((response: any) => {
    //   if (response) {
    //     for (let index = 0; index < response.length; index++) {
    //       const element = response[index];

    //       if (
    //         element.RoleId == "8e759c69-1ed6-445b-b7f8-32c3fd44e8be" ||
    //         element.RoleId == "3ba734c5-d75a-44c7-8c47-5233431372ba"
    //       ) {
    //         this.eid = element.UserId;
    //         this.hideit = true;
    //         break;
    //       } else {
    //         this.eid = element.UserId;
    //         console.log("responseresponseresponse", element);
    //         this.hideit = false;
    //       }
    //     }
    //   }
    // });
    // this.serviceService.getUserRole().subscribe((response: any) => {
    //   if (response) {
    //     for (let index = 0; index < response.length; index++) {
    //       const element = response[index];

    //       if (
    //         element.RoleId ===
    //         "B59EA343-65EF-4C41-95A8-02D9AD81BFCD".toLocaleLowerCase()
    //       ) {
    //         this.serviceService.backbuttonviable = true;
    //         break;
    //       } else {
    //         this.serviceService.backbuttonviable = false;
    //       }
    //     }
    //   }
    // });
    // this.serviceService.getUserRole().subscribe((response: any) => {
    //   if (response) {
    //     for (let index = 0; index < response.length; index++) {
    //       const element = response[index];

    //       if (
    //         element.RoleId ==
    //           "8C133397-587E-456F-AB31-9CF5358BE8D2".toLocaleLowerCase() ||
    //         element.RoleId ==
    //           "270F762A-5393-4971-83BA-C7FF7D560BDA".toLocaleLowerCase() ||
    //         element.RoleId ==
    //           "B59EA343-65EF-4C41-95A8-02D9AD81BFCD".toLocaleLowerCase()
    //       ) {
    //         this.eid = element.UserId;
    //         this.serviceService.isRecordDocumentationManager = true;
    //         console.log("responseresponseresponserole", element);
    //         break;
    //       } else {
    //         this.eid = element.UserId;
    //         console.log("responseresponseresponse", element);
    //         this.serviceService.isRecordDocumentationManager = false;
    //       }
    //     }
    //   }
    // });

    // this.serviceService.GetSuperviedUsers().subscribe((SuperviedUsers) => {
    //   this.SuperviedUsers = SuperviedUsers;
    //   this.SuperviedUsers = Object.assign([], this.SuperviedUsers);
    //   this.SuperviedUsers = SuperviedUsers;
    //   if (this.SuperviedUsers != undefined || this.SuperviedUsers != null) {
    //     if (this.SuperviedUsers.length > 0) {
    //       this.isSuperviedUsers = true;
    //     } else {
    //       this.isSuperviedUsers = false;
    //     }
    //   }
    // });

    // // this.preback();
    // if (
    //   environment.Lang_code === "am-et" ||
    //   environment.Lang_code === "am-ET"
    // ) {
    //   this.language = "amharic";
    // } else {
    //   this.language = "english";
    // }

    console.log("Servicesssssssss");
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log("leaseappppppp", params);
      // this.ID = params['id'];
      this.formcode = params["formcode"];
      this.AppNo = params["AppNo"];
      this.SDP_ID = params["SDP_ID"];
      this.Service_ID = this.SDP_ID;
      this.getAll(this.AppNo);
      this.tskTyp = params["tskTyp"];
      this.tskID = params["tskID"];
      // if (this.serviceService.propertytaskslist != undefined) {
      //   let filterpropertyid = this.serviceService.propertytaskslist.filter(
      //     (x: any) => x.id.toLocaleLowerCase() === this.tskID
      //   );
      //   console.log(
      //     "🚀 ~ this.activatedRoute.params.subscribe ~ filterpropertyid:",
      //     filterpropertyid,
      //     this.serviceService.propertytaskslist,
      //     this.tskID
      //   );
      //   if (filterpropertyid.length > 0) {
      //     this.serviceService.backbuttonviable = true;
      //   } else {
      //     this.serviceService.backbuttonviable = false;
      //   }
      // }

      if (this.tskTyp == "c800fb16-f961-e111-95d6-00e04c05559b") {
        this.getTaskRule(params["tskID"]);
      }
      this.DocID = params["docid"];
      //  this.getFormData(params['docid']);
      this.todoID = params["todoID"];
      this.formcode = params["formcode"];
    });

    this.hideBackButton();
    this.getLookups();
    this.getRequiredDocs();
    this.GetPlot_Land_Grade_lookup();
    this.getLease_Stuts_Lookup();

    if (this.formcode == "a7a1e05e-32c2-4f44-ad58-306572c64593") {
      if (this.tskID == "2d9d02f7-ab7d-4ab2-bf0e-495cd8067558") {
        this.plotRegistrationFields.FIELD_ONE = "Well id";
      }
      this.ID = 2;
    } else if (
      this.formcode == "b1a9c82a-9553-4055-a6cf-cd42d72cbe87" ||
      this.formcode == "39d82943-6633-4df8-bb7a-6aa0933135e2" ||
      this.formcode == "fa3720f6-28f3-41a3-8867-426df29f4d76"
    ) {
      this.ID = 5;
    } else if (
      this.formcode == "9c286262-ee30-4b63-b356-e140d85b6499" ||
      this.formcode == "9e0834e9-7ec2-460c-a5ed-7ade1204c7ee"
    ) {
      if (this.tskID == "d3465fc3-e54f-4b8e-ba40-a084bd713bd0") {
        this.prepareCertificateFields.FIELD_ONE = "Issued by";
      }
      this.ID = 6;
    } else if (this.formcode == "a0f4df42-5216-4c03-b286-35866c47a866") {
      this.ID = 7;
    } else if (this.formcode == "10e401e1-4ba3-40c8-b16a-773f61907a54") {
      this.ID = 8;
    } else if (this.formcode == "da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff") {
      this.ID = 9;
    } else if (this.formcode == "da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1f") {
      this.ID = 10;
    } else if (this.formcode == "cc71e78d-ef6f-4b93-8d8e-3996f1043fba") {
      this.serviceService.disablefins = false;
      this.ID = 12;
    } else {
      this.ID = 0;

      // if (this.AppNo != undefined || this.AppNo != null) {
      //   this.se.on(this.eventTypes.JSONFOUND, () => {
      //     this.serviceService.getFormData(this.formcode).subscribe(
      //       (success:any) => (this.ID = 1),
      //       (error:any) => (this.ID = 404)
      //     );
      //     console.log("display form");
      //     console.log("ddd", this.formcode);
      //   });
      // } else {
      //   this.serviceService.getFormData(this.formcode).subscribe(
      //     (success:any) => (this.ID = 1),
      //     (error:any) => (this.ID = 404)
      //   );
      // }
    }
    if (this.RequerdDocs) {
      for (let i = 0; i < this.RequerdDocs.length; i++) {
        console.log(
          "this.RequerdDocs[i].description_en.indexOf('*')",
          this.RequerdDocs[i].description_en.indexOf("*")
        );
        if (this.RequerdDocs[i].description_en.indexOf("*") !== -1) {
          this.RequerdDocs[i].required = true;
        }
      }
      this.updated.emit({ docs: this.RequerdDocs });
    }
  }
  public getAll(AppNo:any) {
    // this.serviceService
    //   .GetApplicationNumberByUserInfo(AppNo)
    //   .subscribe((licenceService) => {
    //     this.custmerInformation = licenceService[0];
    //     console.log(
    //       "🚀 ~ .subscribe ~ custmerInformation:",
    //       this.custmerInformation
    //     );
    //   });
    // this.getuserName(this.AppNo);
    // console.log("appppppp", AppNo);
    this.serviceService.getAll(AppNo).subscribe(
      (licenceService:any) => {
        this.licenceService = licenceService;
        console.log("Licence Service", this.licenceService);
        if (this.licenceService.list.length > 0) {
          this.licenceData = this.licenceService.list[0];

          this.serviceService.licenceData = this.licenceData;
          this.SDP_ID = this.licenceData.SDP_ID;
          this.serviceService.currentsdpid = this.SDP_ID;
          this.Service_ID = this.licenceData.Service_ID;
          this.serviceService.Service_ID = this.licenceData.Service_ID;
          this.serviceService.Service_ID = this.SDP_ID;
          this.Licence_Service_ID = this.licenceData.Licence_Service_ID;
          this.AppCode = this.licenceData.Licence_Service_ID; //
          this.AppNo = this.licenceData.Application_No; //
          this.serviceService.appnoForRecord = this.licenceData.Application_No;
          this.serviceService.LicenceserviceID = this.Licence_Service_ID;
          console.log("licenceData", this.licenceData);

          // if (this.licenceData.Certificate_Code > 0) {
          //   this.getPriveysLicence(this.licenceData.Certificate_Code);
          // } else {
          //   this.getPriveysLicence(this.licenceData.Application_No);
          // }
        }

        // if (this.ID == 2) {
        //   this.disablefins = false;
        //   this.getPlotManagement();
        // } else if (this.ID == 3) {
        //   this.disablefins = false;
        //   this.getPlotManagement();
        // } else if (this.ID == 4) {
        //   this.disablefins = false;
        //   this.getDeed();
        // }
        // console.log('Licence data2', this.licenceData);
        // this.taskType = this.licenceData.TaskType;
        this.loading = false;
      },
      (error:any) => {
        console.log(error);
        // this.se.emit(this.eventTypes.JSONFOUND);
      }
    );
  }
  getTaskRule(arg0: any) {
    throw new Error('Method not implemented.');
  }
  hideBackButton() {
    throw new Error('Method not implemented.');
  }
  getLookups() {
    throw new Error('Method not implemented.');
  }
  getRequiredDocs() {
    throw new Error('Method not implemented.');
  }
  GetPlot_Land_Grade_lookup() {
    throw new Error('Method not implemented.');
  }
  getLease_Stuts_Lookup() {
    throw new Error('Method not implemented.');
  }
}
