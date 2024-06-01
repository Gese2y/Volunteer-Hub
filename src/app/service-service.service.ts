import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceServiceService {
  licenceData: any;
  currentsdpid: any;
  Service_ID: any;
  appnoForRecord: any;
  LicenceserviceID: any;
  getFormData(formcode: any) {
    throw new Error('Method not implemented.');
  }
  disablefins: any;
  GetSuperviedUsers() {
    throw new Error('Method not implemented.');
  }
  getUserRole() {
    return 0;
  }
private taskdropdown = environment.rootPath + "tasks/proctasks";
private servicedropdwn =environment.rootPath + "services/procservices";
private user_98_97 =environment.rootPath + "User_98_97/procUser_98_97";
private View_user_98_97 =environment.rootPath + "view/View_User_98_97";
private woredaLookup =environment.rootPath + "Woreda_Lookup/procWoreda_Lookup/";
private service_group =environment.rootPath + "Service_Group/procService_Group";
private nextTaskCompleteURL = environment.rootpath3 + "BPEL/nextTaskComplete"; // URL to web api
private OrganizationRegistrationServices = environment.rootpath3 + "View_Topic_ERP"; // URL to web api
private SaveDataURL = environment.rootpath3 + "BPEL/SaveData"; 
private cust =environment.rootPath + "Customer/procCustomer";
private Backgroundstat =environment.rootPath + "Background_status/procBackground_status";
private Lang =environment.rootPath + "Language_skill/procLanguage_skill";
private Volunteership =environment.rootPath + "Volunteership/procVolunteership";
private Organization =environment.rootPath + "Organization_Detail/procOrganization_Detail";
private Request =environment.rootPath + "Request/procRequest";
private License_ServiceURL = environment.rootpath3+  "License_Service";
  


  constructor(private http: HttpClient) { }

  getOrganizationRegisterService(){
return this.http.get(this.OrganizationRegistrationServices)
  }
  getcust(_username: any) {
    return this.http.get(this.cust+'/'+_username);
  }
  getBackgroundstat() {
    return this.http.get(this.Backgroundstat);
  }
  getAll(AppNo:any) {
    return this.http.get<any[]>(
      this.License_ServiceURL +
        "?" +
        "sortOrder=test&currentFilter=" +
        AppNo +
        "&searchString&pageIndex&pageSize"
    );
  }
  getBackgroundstatById(id:any) {
    console.log('this.custid2',id);
    
    return this.http.get(this.Backgroundstat+'/'+id);
  }
  update_data(data: any) {
    return this.http.put(this.cust,
      data
    );
  }
  insertBackstat_data(data: any) {
    return this.http.post(this.Backgroundstat,
      data
    );
  }
  insertLang(data: any) {
    return this.http.post(this.Lang,
      data
    );
  }
  insertVolunteer(data: any) {
    return this.http.post(this.Volunteership,
      data
    );
  }
  insertOrganization(data: any) {
    return this.http.post(this.Organization,
      data
    );
  }
  insertRequest(data: any) {
    return this.http.post(this.Request,
      data
    );
  }
  updateRequest(data: any) {
    return this.http.put(this.Request,
      data
    );
  }
  getRequestById(data: any) {
    return this.http.get(this.Request+'/'+data
    );
  }
  updateOrganization(data: any) {
    return this.http.put(this.Organization,
      data
    );
  }
  getOrganizationById(data: any) {
    return this.http.get(this.Organization+'/'+
      data
    );
  }
  deletetVolunteer(id: any) {
    return this.http.delete(this.Volunteership+'/'+
      id
    );
  }
  updateVolunteer(data: any) {
    return this.http.put(this.Volunteership,data
    );
  }
  getVolunteer() {
    return this.http.get(this.Volunteership
    );
  }
  getland(){
    return this.http.get(this.Lang)
  }
  updateBackstat_data(data: any) {
    return this.http.put(this.Backgroundstat,
      data
    );
  }
  sendNote(msg:any, AppNo:any, todoid:any, orgid:any) {
    return this.http.post(
      `${environment.rootpath2}sendNot?meg=${msg}&Application_number=${AppNo}&todoid=${todoid}&orgid=${orgid}`,
      null
    );
  }
  saveFormm(ApplicationCode:any, serviceId:any, taskid:any, orgid:any, json:any, docid:any, todoID:any) {
    // taskid = "0095300b-ffa8-4b74-b6e4-e4b984b85a31";
    //serviceId = "4c45e330-40a1-46d3-83ee-443eace0faf6";
    //orgid="df9d76cd-c5fe-49f3-8984-88b97985ff03";
    return this.http.post(
      this.SaveDataURL +
        "?ApplicationCode=" +
        ApplicationCode +
        "&serviceId=" +
        serviceId +
        "&taskid=" +
        taskid +
        "&orgid=" +
        orgid +
        "&UserName=" +
        environment._UserName +
        "&json=" +
        json +
        "&docid=" +
        docid +
        "&todoID=" +
        todoID,

      null
    );
  }
  Submit(AppCode:any, docID:any, todoID:any, ruleid:any) {
    return this.http.post(
      this.nextTaskCompleteURL +
        "?ApplicationNo=" +
        AppCode +
        "&docid=" +
        docID +
        "&todoid=" +
        todoID +
        "&userName=" +
        environment._UserName +
        "&status=C&Taskruleid=" +
        ruleid +
        "&ispending=false",
      null
    );
  }
  DeleteNote(ApplicationNo:any, noteid:any) {
    return this.http.post(
      `${environment.rootpath2}Delete_postit_notes?Application_number=${ApplicationNo}&postitid=${noteid}`,
      null
    );
  }

  addNote(ApplicationNumber:any, Msg:any, docid:any) {
    return this.http.post(
      `${environment.rootpath2}Set_postit_notes?Application_number=${ApplicationNumber}&uid=${environment._UserName}&Msg=${Msg}&docid=${docid}`,
      null
    );
  }

  saveNote(msg:any, noteid:any, docid:any) {
    return this.http.post(
      `${environment.rootpath2}Edit_postit_notes?msg=${msg}&postitid=${noteid}&docid=${docid}`,
      null
    );
  }

  GetNote(ApplicationNo:any) {
    return this.http.post(
      `${environment.rootpath2}Get_postit_notes?Application_number=${ApplicationNo}`,
      null
    );
  }

}
