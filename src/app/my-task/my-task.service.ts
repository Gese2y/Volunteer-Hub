import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyTaskService {

  private MytasksUrl = environment.rootpath2 + 'GetlistofTodo';  // URL to web api
  private SupervisertasksUrl = environment.rootpath2 + 'GetTodoListToSup';  // URL to web api
  private GetSuperviedUsersUrl = environment.rootpath2 + 'Get_SuperviedUsers';  // URL to web api
  private AssignToUserUrl = environment.rootpath2 + 'AssigEmpToDo';  // URL to web api
  private IsLockedBy_OtherUserUrl = environment.rootpath2 + 'IsLockedBy_OtherUser';  // URL to web api
  private orgId = '1EFB0336-26C6-4BF1-AEB8-8DA0D4F7DBBB';

  constructor(private http: HttpClient) {
  }

  getMytasks() {
    return this.http.get(this.MytasksUrl + '?username=' + environment._UserName +
      '&orgid=' + this.orgId + '&lanid='
      + environment.Lang + '&userroll' +
      '=00000000-0000-0000-0000-000000000000');
  }

  getSupervisertasks() {
    return this.http.get(this.SupervisertasksUrl + '?username=' + environment._UserName +
      '&orgid=' + this.orgId + '&lanid=' + environment.Lang);
  }

  GetSuperviedUsers() {
    return this.http.get(this.GetSuperviedUsersUrl + '?username=' + environment._UserName);

  }


  AssignToUser(ApplicationNo:any, todoid:any, status:any, EmpID:any, taskid:any) {
    return this.http.post(this.AssignToUserUrl + '?ApplicationNo=' + ApplicationNo + '&todoid=' + todoid
      + '&userName=' + environment._UserName + '&status=' + status + '&EmpID=' + EmpID + '&taskid=' + taskid, null);
  }

  IsLockedBy_OtherUser(todoid:any) {
    return this.http.get(this.IsLockedBy_OtherUserUrl + '?todoid=' + todoid + '&Username=' + environment._UserName);
  }
}
