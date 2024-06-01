import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private taskdropdown = environment.rootPath + "tasks/proctasks";
  private servicedropdwn =environment.rootPath + "services/procservices";
  private user_98_97 =environment.rootPath + "User_98_97/procUser_98_97";
  private View_user_98_97 =environment.rootPath + "view/View_User_98_97";
  private woredaLookup =environment.rootPath + "Woreda_Lookup/procWoreda_Lookup/";
  private service_group =environment.rootPath + "Service_Group/procService_Group";
  
  private DocumentArc =environment.rootPath + "Document_Archive/procDocument_Archive";
  
 
  private All_Service = 'http://197.156.93.110/XOKA.eoffice.bpel_Land/api/' + "BPEL/Service";
  private Task_Service = 'http://197.156.93.110/XOKA.eoffice.bpel_Land/api/' + "BPEL/getTasks";

  //  private  All_Org= "https://www.addisland.gov.et:444/XOKA.eoffice.bpel_land/api/BPEL/AllOrg"
  private orgdropdwn=environment.rootPath +"organizations/procorganizations";
  //  private orgdropdwn="https://www.addisland.gov.et:444/Xoka_land_API/api/organizations/procorganizations";
  //  public Application_status = "https://www.addisland.gov.et:444/Xoka_land_API/api/view/viewStatusReport/organization/";
  //  public Application_status = environment.rootPath + "view/viewStatusReport/organization/";
  public customerUrl = environment.rootPath + "Customer/procCustomer";
  public Username = environment.rootPath + "view/View_GetcustomerAllWithVitalId/";
  public CustomerId = environment.rootPath + "view/View_GetcustomerAllWithVitalId/Customer_ID/";
  public CustomerByColumn= environment.rootPath + "Customer/procCustomer/Column/"
  public Application_status= environment.rootPath + "viewStatusReportS/procviewStatusReport/"
  public Application_statusCheckOrg= environment.rootPath + "View_applicationorgforapi"
  public Postitnote= environment.rootPath + "view/View_postit_note_user/application_number"
  public QRcode= environment.rootPath + "QRCode/QRCode"
  public CustomerByColumn1= environment.rootPath + "Customer/procCustomer/Column/Column/CustomerLoadByTitledeedculumn/";
  private EthiopianToGregorian = environment.rootPath + "EthiopianToGregorian";
  private gregorianToEthiopianDate =
  environment.rootPath + "gregorianToEthiopianDate";
  public DocByAppNo = environment.rootPath + "View_RecordAppNoAndDocIdByAppNo/procView_RecordAppNoAndDocIdByAppNo/";
  public DeedByAPP = environment.rootPath + "view/View_DeedRegstration/Application_No/";
  public DeedByCustId = environment.rootPath + "view/View_DeedRegstration12/Customer_ID";
  public AppbyUserId = environment.rootPath + "ApplicationLoadByUserId/procApplicationLoadByUserId/";
  
 
  
  
  
  
  
    constructor(private http: HttpClient) { }
  
  
   

  
   

    getDocumentArc(){
      return this.http.get(this.DocumentArc)
    }
    getView_user_98_97(){
      return this.http.get(`http://197.156.93.110/Xoka_land_API/api/view/View_User_98_97`)
    } 


    gettask(serviceCode: string) {
      const url = `${this.Task_Service}?ServiceCode=${encodeURIComponent(serviceCode)}`;
      return this.http.get(url);
    }
    getservice(){
      return this.http.get(this.All_Service)
    }
    getservice_group(){
      return this.http.get(this.service_group)
    }
    

    getcustomerby() {
      return this.http.get(this.customerUrl);
    }
    getUser_98_97() {
      return this.http.get(this.user_98_97);
    }
  
}
