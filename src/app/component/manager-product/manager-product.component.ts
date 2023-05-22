import { Component, ElementRef, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStateChangeEvent, EditService, GridDataResult } from '@progress/kendo-angular-grid';
import { GroupDescriptor, State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'src/app/shared/message.service';
import { WindowProductComponent } from './windowProduct.component';
import { WindowUploadComponent } from './windowUpload.component';
import { NotificationService } from '@progress/kendo-angular-notification';
import { HttpClient } from '@angular/common/http';
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-manager-product',
  templateUrl: './manager-product.component.html',
  styleUrls: ['./manager-product.component.css']
})
export class ManagerProductComponent implements OnInit {
  public view!: Observable<GridDataResult>;
  public opened = false;
  public hiddenColumns: string[] = [];
  public gridData: Array<any> = [];
  public method: any;
  public loading = false;
  count = 0;
  public state: State = {
    filter: undefined,
    skip: 0,
    take: 10,
    sort: [],
  };
  constructor(private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private formBuilder: FormBuilder) { }

  public api: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);

  ngOnInitsearch(name: any ): void {

    this.api.isManager = true;
    this.api.Controller = "ProductManagerController";
    this.api.name = name;
    this.api.Readserch.Execute().subscribe((res) => {
      this.gridData = res.data;
      this.api.dataSource = res.data;
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
  filterByCategory(name: any) {
    this.api.isManager = true;
    this.api.Controller = "/Manager/CategoryManagerController";
    this.api.name = name;
    this.api.ReadCate.Execute().subscribe((res) => {
      this.gridData = res.data;
      this.api.dataSource = res.data;
      this.message.SendDataAfterUpdate(res.data);
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    });
  }

  ngOnInit(): void {
    this.api.isManager = true;
    this.api.Controller = "ProductManagerController";
    this.api.OpenWindow.Width = 1200;
    this.api.typeData = "popup";
    this.api.loading = true;
    this.gridData.forEach((item, index) => {
      item.index = index + 1;
    });
    this.count = this.gridData.length;
    this.api.Readproduc.Execute().subscribe((rs) => {
      this.api.dataSource = rs.data;
      this.gridData = rs.data;
      this.api.loading = false
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
      this.api.loading = false
    })
    this.message.receivedDataAfterUpadte().subscribe((res) => {
      if (res.status) {
        this.gridData = res.data;
      }
    })
  }

  isHidden(columnName: string): boolean {
    return this.hiddenColumns.indexOf(columnName) > -1;
  }

  Category(id: number): any {
    return this.gridData.find(x => x.id === id);
  }
  addHanler(event: any) {
    this.api.OpenWindow.top = -115;
    this.api.OpenWindow.left = -60;
    this.api.OpenWindow.Width = 1200;
    this.api.OpenWindow.Height = 600;
    this.api.Create.Execute(WindowProductComponent, this.gridData[0]);
  }
  editHandler(event: any) {
    this.api.OpenWindow.top = -115;
    this.api.OpenWindow.left = -60;
    this.api.OpenWindow.Width = 1200;
    this.api.OpenWindow.Height = 600;
    this.api.Edit.Execute(WindowProductComponent, event);
  }
  removeHandler(event: any) {
    this.api.Destroy.Execute(null,event.dataItem);
  }
  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }
  UploadImage(event: any): void {
    this.api.OpenWindow.top = -190;
    this.api.OpenWindow.left = 100;
    this.api.OpenWindow.Width = 900;
    this.api.OpenWindow.Height = 700;
    this.api.OpenWindow.Execute(WindowUploadComponent, this.gridData.find((x) => x.id == event), null);
  }



}
