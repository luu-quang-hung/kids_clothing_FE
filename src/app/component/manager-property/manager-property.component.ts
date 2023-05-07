import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'src/app/shared/message.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-manager-property',
  templateUrl: './manager-property.component.html',
  styleUrls: ['./manager-property.component.css']
})
export class ManagerPropertyComponent implements OnInit {
  public gridData: Array<any> = [];
  count = 0;

  public changes: any = {};
  constructor(private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private formBuilder: FormBuilder) { }

  public api: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);

  ngOnInit(): void {
    this.api.isManager = true;
    this.api.Controller = "PropertyManagerController";
    this.gridData.forEach((item, index) => {
      item.index = index + 1;
    });
    this.count = this.gridData.length;
    this.api.Read.Execute().subscribe((res) => {
      this.gridData = res.data;
    })
    this.message.receivedDataAfterUpadte().subscribe((rs) => {
      this.gridData = rs.data;

    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    })
    this.message.receivedDataBehavior().subscribe((rs) => {
      this.gridData = rs;
    })
  }

  Rules(): boolean{
    if(this.api.formGroup.value.name == ""){
      this.api.Notification.notificationWarning('Không được để trống tên màu');
      return false;
    }
    return true;
  }

  Update(grid: any): void {
    if(!this.Rules()){return;}
    this.api.Update.Execute(grid);
  }

  addHandler(event: any): void {
    this.api.Create.Execute(null, event.sender.data.data);
    event.sender.addRow(this.api.formGroup);
  }
  saveHandler(event: any) {
    if(!this.Rules()){return;}
    this.api.Grid.saveHandler(event);
    event.sender.closeRow(event.rowIndex);
  }

  cellClickHandler(event: any): void {
    this.api.Grid.cellClickHandler(event);
  }
  cellCloseHandler(event: any): void {
    if(!this.Rules()){return;}
    this.api.Grid.cellCloseHandler(event);
  }

  removeHandler(event: any): void {
    this.api.Grid.removeHandler(event);
    event.sender.cancelCell();
  }

  cancelChanges(grid: any): void {
    grid.cancelCell();
  }

  cancelHandler(event: any): void {
    event.sender.closeRow(event.rowIndex);
  }
}
