import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { GridComponent } from '@progress/kendo-angular-grid';
import { NotificationService } from '@progress/kendo-angular-notification';
import { take } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'src/app/shared/message.service';
import { WindowBillComponent } from './windowBill.component';

@Component({
  selector: 'app-manager-bill',
  templateUrl: './manager-bill.component.html',
  styleUrls: ['./manager-bill.component.css']
})
export class ManagerBillComponent implements OnInit {
  public gridData: Array<any> = [];

  constructor(public api: ApiService,private ngZone: NgZone, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private message: MessageService, private formBuilder: FormBuilder) { }

  public Bill: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public listStatus: Array<{ id: any, name: string }> = [
    {
      id: 0,
      name: "CHUA_XAC_NHAN"
    },
    {
      id: 1,
      name: "DA_XAC_NHAN_VA_DONG_GOI"
    },
    {
      id: 2,
      name: "DA_GIAO_BEN_VAN_CHUYEN"
    },
    {
      id: 3,
      name: "KHACH_DA_NHAN_HANG"
    },
    {
      id: 4,
      name: "HOAN_HANG"
    },
    {
      id: 5,
      name: "HUY"
    },
  ]
  public listpaypent: Array<{ id: any, name: string }> = [
    {
      id: 0,
      name: "Thanh toán bằng tiền mặt"
    },
    {
      id: 1,
      name: "Thanh toán bằng ví"
    }
  ]
  ngOnInit(): void {
    this.Bill.isManager = true;
    this.Bill.Controller = "BillManagerController"; 
    this.Read();
    this.message.receivedDataAfterUpadte().subscribe((rs)=>{
      this.Bill.loading = true;
      this.Read();
    })
    this.message.receivedDataBehavior().subscribe((rs) => {
      this.gridData = rs;
    })
  }
  ngOnInitdropdow(event: Event): void {
    this.Bill.name =  (event.target as HTMLSelectElement).value;
    this.Bill.isManager = true;
    this.Bill.Controller = "BillManagerController"; 
    this.Readdropdow();
    this.message.receivedDataAfterUpadte().subscribe((rs)=>{
      this.Bill.loading = true;
      this.Readdropdow();
    })
    this.message.receivedDataBehavior().subscribe((rs) => {
      this.gridData = rs;
    })
  }
  ngOnInitpayment(event: Event): void {
    this.Bill.payment =  (event.target as HTMLSelectElement).value;
    this.Bill.isManager = true;
    this.Bill.Controller = "BillManagerController"; 
    this.Readpayment();
    this.message.receivedDataAfterUpadte().subscribe((rs)=>{
      this.Bill.loading = true;
      this.Readpayment();
    })
    this.message.receivedDataBehavior().subscribe((rs) => {
      this.gridData = rs;
    })
  }

  Read(): void{
    this.Bill.loading = true;
    this.Bill.Read.Execute().subscribe((rs) => {
      this.gridData = rs.data;
      this.Bill.loading = false;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.Bill.Notification.notificationError('');
      }
    })   
  }
  Readdropdow(): void{
    this.Bill.loading = true;
    this.Bill.Readdropdow.Execute().subscribe((rs) => {
      this.gridData = rs.data;
      this.Bill.loading = false;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.Bill.Notification.notificationError('');
      }
    }
  )   
  }

  Readpayment(): void{
    this.Bill.loading = true;
    this.Bill.Readpayment.Execute().subscribe((rs) => {
      this.gridData = rs.data;
      this.Bill.loading = false;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.Bill.Notification.notificationError('');
      }
    }
  )   
  }

  Update(grid: any): void {
    this.Bill.Update.Execute(grid);
  }
  onStatusChange(event: any): void{
    this.Bill.formGroup.markAsDirty({onlySelf: true});
    this.Bill.formGroup.controls.status.setValue(this.listStatus.find((x)=> x.id == event)?.name);
  }
  editHandler(event: any) {
    this.Bill.OpenWindow.top = -115;
    this.Bill.OpenWindow.left = -60;
    this.Bill.Edit.Execute(WindowBillComponent, event);
  }
  cellClickHandler(event: any): void {
    if (!event.isEdit && this.isReadOnly(event.column.field)) {
      this.Bill.Grid.cellClickHandler(event);
    }
  }
  cellCloseHandler(event: any): void {
    this.Bill.Grid.cellCloseHandler(event);
  }
  private isReadOnly(field: string): boolean {
    const readOnlyColumns = ["statusshipping"];
    return readOnlyColumns.indexOf(field) > -1;
  }


  

}
