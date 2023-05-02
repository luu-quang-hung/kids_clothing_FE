import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { State } from '@progress/kendo-data-query';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-manager-voucher',
  templateUrl: './manager-voucher.component.html',
  styleUrls: ['./manager-voucher.component.css']
})
export class ManagerVoucherComponent implements OnInit {

  public listVoucher: Array<any> = [];
  public listEvent: Array<any> = [];
  public listserch: Array<any> = [];
  public state: State = {
    filter: undefined,
    skip: 0,
    take: 10,
    group: [],
    sort: [],
  };
  constructor(private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private formBuilder: FormBuilder) { }

  public Voucher: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public Event: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  ngOnInitserch(name: any): void {
    this.Voucher.isManager = true;
    this.Event.isManager = true;
    this.Event.Controller = "EventManagerController";
    this.Voucher.name = name;
    this.Voucher.Controller = "VoucherManagerController";
    this.Voucher.Readserch.Execute().subscribe((res) => {
      this.listVoucher = res.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.Voucher.Notification.notificationError('');
      }
    })
    this.Event.Read.Execute().subscribe((res) => {
      this.listEvent = res.data;
      this.Event.dataSource = res.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.Event.Notification.notificationError('');
      }
    })
    this.message.receivedDataAfterUpadte().subscribe((rs) => {
      this.listVoucher = rs.data;
    })
    this.message.receivedDataBehavior().subscribe((rs) => {
      this.listVoucher = rs;
    })
  }

  ngOnInit(): void {
    this.Voucher.isManager = true;
    this.Event.isManager = true;
    this.Event.Controller = "EventManagerController";
    this.Voucher.Controller = "VoucherManagerController";
    this.Voucher.Read.Execute().subscribe((res) => {
      this.listVoucher = res.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.Voucher.Notification.notificationError('');
      }
    })
    this.Event.Read.Execute().subscribe((res) => {
      this.listEvent = res.data;
      this.Event.dataSource = res.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.Event.Notification.notificationError('');
      }
    })
    this.message.receivedDataAfterUpadte().subscribe((rs) => {
      this.listVoucher = rs.data;
    })
    this.message.receivedDataBehavior().subscribe((rs) => {
      this.listVoucher = rs;
    })
  }
  EventVoucher(id: number): any {
    return this.listEvent.find(x => x.id === id);
  }
  
  onEventChange(event: any): void{
    this.Voucher.formGroup.markAsDirty({ onlySelf: true });
    this.Voucher.formGroup.value.idevent = event;
    this.Voucher.formGroup.value.event = this.listEvent.find((x) => x.id == event);
  }
  Rule(): boolean{
    if(this.Voucher.formGroup.value.name == ""){
      this.Voucher.Notification.notificationWarning('Không được để trống tên voucher');
      return false;
    }
    if(this.Voucher.formGroup.value.amount == ""){
      this.Voucher.Notification.notificationWarning('Không được để trống số lượng');
      return false;
    }
    if(this.Voucher.formGroup.value.amount < 0){
      this.Voucher.Notification.notificationWarning('Số lượng phải lớn hơn 0');
      return false;
    }
    if(this.Voucher.formGroup.value.discount == ""){
      this.Voucher.Notification.notificationWarning('Không được để trống tỉ lệ giảm giá');
      return false;
    }
    if(this.Voucher.formGroup.value.discount < 0){
      this.Voucher.Notification.notificationWarning('Tỉ lệ giảm giá phải lớn hơn 0');
      return false;
    }
    if(this.Voucher.formGroup.value.event == ""){
      this.Voucher.Notification.notificationWarning('Không được để trống loại sự kiện');
      return false;
    }
    return true;
  }
  Update(grid: any): void {
    if(!this.Rule()){return;}
    this.Voucher.Update.Execute(grid);
  }
  addHandler(event: any): void {
    this.Voucher.Create.Execute(null, event.sender.data.data);
    event.sender.addRow(this.Voucher.formGroup);
  }
  saveHandler(event: any) {
    if(!this.Rule()){return;}
    this.Voucher.Grid.saveHandler(event);
    event.sender.closeRow(event.rowIndex);
  }
  cellClickHandler(event: any): void {
    this.Voucher.Grid.cellClickHandler(event);
  }
  cellCloseHandler(event: any): void {
    if(!this.Rule()){return;}
    this.Voucher.Grid.cellCloseHandler(event);
  }
  removeHandler(event: any): void {
    this.Voucher.Grid.removeHandler(event);
    event.sender.cancelCell();
  }
  cancelChanges(grid: any): void {
    grid.cancelCell();
  }
  cancelHandler(event: any): void {
    event.sender.closeRow(event.rowIndex);
  }
  dataStateChange(state: DataStateChangeEvent): void {
    console.log(state)
    this.state = state;
  }
}
