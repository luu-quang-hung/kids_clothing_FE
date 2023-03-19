import { Component, Input, ElementRef, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, NgZone } from '@angular/core';
import { groupBy, GroupResult } from '@progress/kendo-data-query';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public opened = false;
  public openedListStatus = false;
  public currentChart = 0;
  public currentTable = 0;
  public chart: any;
  public status: any;
  public date = new Date();
  public series: Array<any> = [];
  public chartDayOfMonth: Array<any> = [];
  public chartMonthOfYear: Array<any> = [];
  public listBillOfMonth: Array<any> = [];
  public listQuantityByDay: Array<any> = [];
  public listQuantityByMonth: Array<any> = [];
  public listStatusRefund: Array<any> = [];
  public listStatus: Array<{ id: any, name: string }> = [
    {
      id: "CHUA_XAC_NHAN",
      name: "Chưa xác nhận"
    },
    {
      id: "DA_XAC_NHAN_VA_DONG_GOI",
      name: "Đẫ xác nhận và đóng gói"
    },
    {
      id: "DA_GIAO_BEN_VAN_CHUYEN",
      name: "Đã giao bên vận chuyển"
    },
    {
      id: "KHACH_DA_NHAN_HANG",
      name: "Khách đã nhận hàng"
    },
    {
      id: "HOAN_HANG",
      name: "Hoàn hàng"
    },
    {
      id: "HUY",
      name: "Hủy"
    },
  ]
  constructor(public api: ApiService) { }
  ngOnInit(): void {
    this.api.Controller = "StatisController";
    this.status = this.listStatus.find((x)=> x.id == "CHUA_XAC_NHAN")?.id;
    this.ReadChart();
    this.ReadTable();
  }

  ReadChart(): void {
    if (this.currentChart == 0) {
      for (let i = 0; i < this.listStatus.length; i++) {
        let status = this.listStatus[i].id;
        this.getDataDayOfMonth(this.date.getMonth() + 1, this.date.getFullYear(), status);
      }
    }
    if (this.currentChart == 1) {
      for (let i = 0; i < this.listStatus.length; i++) {
        let status = this.listStatus[i].id;
        this.getDataMonthOfYear(this.date.getFullYear(), status);
      }
    }
    this.getBillInMonth();
  }
  ReadTable(){
    let day = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate();
    if(this.currentTable == 0){
      this.getQuantityByDay(day,this.status);
    }
    if(this.currentTable == 1){
      this.getQuantityByMonth(this.status);
    }
  }

  getDataDayOfMonth(month: any, year: any, status: any): void {
    this.api.getApi('Manager/' + this.api.Controller + '/getEveryDayOfTheMonth?month=' + month + '&year=' + year + '&status=' + status)
      .subscribe((rs) => {
        this.chartDayOfMonth = [];
        rs.data.map((val: any, idx: any) => {
          let day = new Date(val.day).getDate();
          let chartDayOfMonth = {
            day: day,
            status: status,
            total: val.total
          }
          this.chartDayOfMonth.push(chartDayOfMonth);
        })
        let arr = groupBy(this.chartDayOfMonth, [{ field: "status" }]) as GroupResult[];
        this.series.push(arr[0]);
      }, (error) => {
        if (error.status == 500) {
          let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
          window.location.href = "/login/" + id;
        } else {
          this.api.Notification.notificationError('');
        }
      })
  }
  getDataMonthOfYear(year: any, status: any) {
    this.api.getApi('Manager/' + this.api.Controller + '/getEveryMonthOfTheYear?year=' + year + '&status=' + status)
      .subscribe((rs) => {
        this.chartMonthOfYear = [];
        rs.data.map((val: any) => {
          let chartMonthOfYear = {
            month: val.month,
            status: status,
            total: val.total
          }
          this.chartMonthOfYear.push(chartMonthOfYear);
        })
        let arr = groupBy(this.chartMonthOfYear, [{ field: "status" }]) as GroupResult[];
        this.series.push(arr[0]);
      }, (error) => {
        if (error.status == 500) {
          let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
          window.location.href = "/login/" + id;
        } else {
          this.api.Notification.notificationError(error.error.message);
        }
      })
  }
  getBillInMonth() {
    this.api.getApi('Manager/' + this.api.Controller + '/bill-dashboard').subscribe((rs) => {
      this.listBillOfMonth = rs.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError(error.error.message);
      }
    })
  }
  getQuantityByDay(day: any,status: any) {
    this.api.getApi('Manager/' + this.api.Controller + '/quantityByDay?day=' + day + '&enumStatus=' + status)
      .subscribe((rs) => {
        this.listQuantityByDay = rs.data;
      }, (error) => {
        if (error.status == 500) {
          let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
          window.location.href = "/login/" + id;
        } else {
          this.api.Notification.notificationError('');
        }
      })
  }
  getQuantityByMonth(status: any){
    this.api.getApi('Manager/' + this.api.Controller + '/quantityByMonth?status=' + status)
    .subscribe((rs) => {
      this.listQuantityByMonth = rs.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    })
  }

  onSelectChart(event: any): void {
    if (event.index == 0) {
      this.series = [];
      this.chartDayOfMonth = [];
      this.currentChart = event.index;
    }
    if (event.index == 1) {
      this.series = [];
      this.chartMonthOfYear = [];
      this.currentChart = event.index;
    }
    this.ReadChart();
  }
  onSelectTable(event: any): void {
    if (event.index == 0) {
      this.listQuantityByDay = [];
      this.currentTable = event.index;
    }
    if (event.index == 1) {
      this.listQuantityByMonth = [];
      this.currentTable = event.index;
    }
    this.ReadTable();
  }

  onChangeStatus(event: any): void{
    this.status = event.id;
    this.opened = false;
    this.ReadTable();
  }
  onChangeDateChart(event: any): void {
    this.date = event;
    if (this.currentChart == 0) {
      this.series = [];
      this.chartDayOfMonth = [];
    }
    if (this.currentChart == 1) {
      this.series = [];
      this.chartMonthOfYear = [];
    }
    this.ReadChart();
  }
  onChangeDateTable(event: any): void{
    let day = event.getFullYear() + '-' + (event.getMonth() + 1) + '-' + event.getDate();
    this.getQuantityByDay(day,this.status);
  }

  close(status: any) {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }
  open() {
    this.opened = true;
  }
  openRefund(){
    this.api.getApi('Manager/' + this.api.Controller + '/bill-dashboard-refund').subscribe((rs)=>{
      this.openedListStatus = true;
      this.listStatusRefund = rs.data;
    })
  }
  closeRefund(){
    this.openedListStatus = false;
  }
}