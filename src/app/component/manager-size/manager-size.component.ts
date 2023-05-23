import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { DataStateChangeEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { GroupDescriptor, State, process, DataResult } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'src/app/shared/message.service';
import { WindowSizeComponent } from './windowSize.component';
import { WindowRef } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-manager-size',
  templateUrl: './manager-size.component.html',
  styleUrls: ['./manager-size.component.css']
})
export class ManagerSizeComponent implements OnInit {
  @ViewChild('myWindow', { static: true }) myWindow: any;
  public gridData: Array<any> = [];
  public gridData_2: Array<any> = [];
  count = 0;
  public state: State = {
    filter: undefined,
    skip: 0,
    take: 10,
    group: [{ field: "typesize.name" }],
    sort: [],
  };
  public changes: any = {};
  constructor(private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private formBuilder: FormBuilder) {
     }

     public openPopup(): void {
      const dialogRef = this.windowService.open({
        content: WindowSizeComponent,
        width: 700,
        height: 500
      });

      dialogRef.result.subscribe((result) => {
        console.log(result);
      });
    }
  public api: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public api_2: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  ngOnInit(): void {
    this.api.isManager = true;
    this.api_2.isManager = true;
    this.api.Controller = "TypeSizeManagerController";
    this.api_2.Controller = "SizeManagerController";
    this.gridData.forEach((item, index) => {
      item.index = index + 1;
    });
    this.count = this.gridData.length;
    this.api_2.Grid.isGrouping = true; // Xem dữ liệu có đc group ko ??
    this.Read();
    this.message.receivedDataAfterUpadte().subscribe((rs) => {
      this.Read();
    })
    this.message.receivedDataBehavior().subscribe((rs) => {
      if (JSON.stringify(this.api.Grid.newState) == JSON.stringify(rs)) {
        this.gridData = rs;
      } else {
        this.api_2.dataSource = rs;
      }
    })
  }

  Read(): void {
    this.api.Read.Execute().subscribe((res) => {
      this.gridData = res.data;
      this.api.dataSource = res.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    })
    this.api_2.Read.Execute().subscribe((res) => {
      this.api_2.dataSource = res.data
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api_2.Notification.notificationError('');
      }
    })
  }

  TypeSize(id: number): any {
    return this.gridData.find(x => x.id === id);
  }
  onTypeSizeChange(event: any): void {
    this.api_2.formGroup.markAsDirty({ onlySelf: true });
    this.api_2.formGroup.value.idtypesize = event;
    this.api_2.formGroup.value.typesize = this.gridData.find((x) => x.id == event);
  }
  Rule_Size(): boolean {
    if (this.api.formGroup.value.name == "") {
      this.api.Notification.notificationWarning('Không được để trống tên size')
      return false;
    }
    return true
  }
  Rule_TypeSize(): boolean {
    if (this.api_2.formGroup.value.name == "") {
      this.api_2.Notification.notificationWarning('Không được để trống tên size')
      return false;
    }
    if (this.api_2.formGroup.value.typesize == "") {
      this.api_2.Notification.notificationWarning('Không được để trống loại size')
      return false;
    }
    return true;
  }
  Update(grid: any): void {
    if (JSON.stringify(grid.data.data) == JSON.stringify(this.gridData)) {
      if (!this.Rule_Size()) {
        return;
      }
      this.api.Update.Execute(grid);
    } else {
      if (!this.Rule_TypeSize()) {
        return;
      }
      this.api_2.Update.Execute(grid);
    }
  }

  addHandler(event: any): void {
    if (JSON.stringify(event.sender.data.data) == JSON.stringify(this.gridData)) {
      this.api.Create.Execute(null, event.sender.data.data);
      event.sender.addRow(this.api.formGroup);
    } else {
      this.api_2.Create.Execute(null, event.sender.data.data[0].items);
      event.sender.addRow(this.api_2.formGroup);
    }
  }
  saveHandler(event: any) {
    if (JSON.stringify(event.sender.data.data) == JSON.stringify(this.gridData)) {
      if (!this.Rule_Size()) {
        return;
      }
      this.api.Grid.saveHandler(event);
    } else {
      if (!this.Rule_TypeSize()){
        return;
      }
      this.api_2.Grid.saveHandler(event);
    }
    event.sender.closeRow(event.rowIndex);
  }

  cellClickHandler(event: any): void {
    if (JSON.stringify(event.sender.data.data) == JSON.stringify(this.gridData)) {
      this.api.Grid.cellClickHandler(event);
    } else {
      this.api_2.Grid.cellClickHandler(event);
    }
  }
  cellCloseHandler(event: any): void {
    if (JSON.stringify(event.sender.data.data) == JSON.stringify(this.gridData)) {
      if (!this.Rule_Size()) {
        return;
      }
      this.api.Grid.cellCloseHandler(event);
    } else {
      if (!this.Rule_TypeSize()){
        return;
      }
      this.api_2.Grid.cellCloseHandler(event);
    }
  }

  removeHandler(event: any): void {
    if (JSON.stringify(event.sender.data.data) == JSON.stringify(this.gridData)) {
      this.api.Grid.removeHandler(event);
    } else {
      this.api_2.Grid.removeHandler(event);
    }
    event.sender.cancelCell();
  }

  cancelChanges(grid: any): void {
    grid.cancelCell();
  }

  cancelHandler(event: any): void {
    event.sender.closeRow(event.rowIndex);
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
  }

}
