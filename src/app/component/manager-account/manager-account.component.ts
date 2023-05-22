import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { State } from '@progress/kendo-data-query';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'src/app/shared/message.service';
import { WindowAccountComponent } from './windowAccount.component';

@Component({
  selector: 'app-manager-account',
  templateUrl: './manager-account.component.html',
  styleUrls: ['./manager-account.component.css']
})
export class ManagerAccountComponent implements OnInit {
   count = 0;
  public gridData: Array<any> = [];
  public isAdmin = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl(false)
  })
  public state: State = {
    filter: undefined,
    skip: 0,
    take: 10,
    group: [],
    sort: [],
  };
  constructor(public api: ApiService, private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private formBuilder: FormBuilder) {
  }
  public Authority: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  
  // ngOnInitserch(name: any): void {
  //   this.api.Controller = "AccountManagerController";
  //   this.api.isManager = true;
  //   this.api.typeData = "popup"
  //   this.api.name = name
  //   this.Readserch();
  //   this.message.receivedDataAfterUpadte().subscribe((rs) => {
  //     this.Readserch();
  //   })
  // }
  ngOnInit(): void {
    this.Authority.isManager = true;
    this.Authority.Controller = "AccountManagerController";
    this.gridData.forEach((item, index) => {
      item.index = index + 1;
    });
    this.count = this.gridData.length;
    this.Read();
    this.message.receivedDataAfterUpadte().subscribe((rs)=>{
      this.Authority.loading = true;
      this.Read();
    })
    this.message.receivedDataBehavior().subscribe((rs) => {
      this.gridData = rs;
    })
  }
  Role(id: number): any {
    let role = this.Authority.dataSource.find(x => x.id === id);
    return role;
  }
  Read(): void{
    this.Authority.loading = true;
    this.Authority.ReadAccountAD.Execute().subscribe((rs) => {
      this.gridData = rs.data;
      this.Authority.loading = false;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.Authority.Notification.notificationError('');
      }
    })
  }
  Readserch(): void{
    this.api.Read.Execute().subscribe((rs) => {
      this.gridData = rs.data.filter((x:any) => x.role.id == "admin" || x.role.id == "staff");
      this.api.dataSource = rs.data
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    })
    this.Authority.getApi('Manager/' + this.api.Controller +'/findAll').subscribe((rs)=>{
      this.Authority.dataSource = rs.data;
    })
  }
 
  addHanler(event: any) {
    this.api.OpenWindow.top = -115;
    this.api.OpenWindow.left = 200;
    this.api.OpenWindow.Width = 550;
    this.api.OpenWindow.Height = 600;
    this.api.Create.Execute(WindowAccountComponent, this.gridData[0]);
  }
  editHandler(event: any) {
    this.api.OpenWindow.top = -115;
    this.api.OpenWindow.left = 200;
    this.api.OpenWindow.Width = 550;
    this.api.OpenWindow.Height = 600;
    this.api.Edit.Execute(WindowAccountComponent, event);
  }
  removeHandler(event: any) {
    this.api.Destroy.Execute(null,event.dataItem);
  }
  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }

}
