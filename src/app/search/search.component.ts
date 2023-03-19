import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { PageChangeEvent } from '@progress/kendo-angular-pager';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchFor: any;
  public listProduct: Array<any> = [];
  public dataSource: any = [];
  public pageSize = 12;
  public skip = 0;
  public pagedDestinations = [];
  public total = 0;
  public status = [
    {
      id: 0,
      name: 'Tất cả'
    },
    {
      id: 1,
      name: 'Giảm giá'
    },
    {
      id: 2,
      name: 'Giá 250.000 - 500.000 VND'
    },
    {
      id: 3,
      name: 'Giá 500.000 - 750.000 VND'
    },
    {
      id: 4,
      name: 'Giá 750.000 - 1.000.000 VND'
    },
  ];
  public selectedValue = 0;
  public contains: any;

  constructor(public api: ApiService, private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private formBuilder: FormBuilder) {
  }
  public Product: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public Quantity: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);

  ngOnInit(): void {
    let id = window.location.href.replace(window.location.origin + "/search/", "");
    this.searchFor = decodeURIComponent(id.replace(/\+/g,  " "));
    this.Product.Controller = "ProductController";
    this.Quantity.Controller = "QuantityController";
    this.Product.getApi('Customer/' + this.Product.Controller + "/findByNameLike/" + id).subscribe((rs) => {
      this.api.dataSource = rs.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    })
    this.Read();
  }
  Read() {
    setTimeout(() => {
      this.api.loading = true;
      this.Quantity.Read.Execute().subscribe((res) => {
        this.listProduct = [];
        this.Quantity.dataSource = res.data;
        switch (this.selectedValue) {
          case 0:
            this.api.dataSource.map((x) => {
              let arr = this.Quantity.dataSource.filter((val) => val.product.id == x.id && val.quantity > 0)
              if (arr.length > 0) {
                this.listProduct.push(x);
              }
            })
            break;
          case 1:
            this.api.dataSource.map((x) => {
              let arr = this.Quantity.dataSource.filter((val) => val.product.id == x.id && val.product.discount > 0 && val.quantity > 0)
              if (arr.length > 0) {
                this.listProduct.push(x);
              }
            })
            break;
          case 2:
            this.api.dataSource.map((x) => {
              let arr = this.Quantity.dataSource.filter((val) => {
                let price = 0;
                if (val.product.discount == undefined || val.product.discount == 0) {
                  price = val.product.price;
                } else {
                  price = Number(val.product.price * val.product.discount / 100);
                }
                if (val.product.id == x.id && price >= 250000 && price <= 500000 && val.quantity > 0) {
                  return x;
                } else {
                  return null;
                }
              })
              if (arr.length > 0) {
                this.listProduct.push(x);
              }
            })
            break;
          case 3:
            this.api.dataSource.map((x) => {
              let arr = this.Quantity.dataSource.filter((val) => {
                let price = 0;
                if (val.product.discount == undefined || val.product.discount == 0) {
                  price = val.product.price;
                } else {
                  price = Number(val.product.price * val.product.discount / 100);
                }
                if (val.product.id == x.id && price >= 500000 && price <= 750000 && val.quantity > 0) {
                  return x;
                } else {
                  return null;
                }
              })
              if (arr.length > 0) {
                this.listProduct.push(x);
              }
            })
            break;
          case 4:
            this.api.dataSource.map((x) => {
              let arr = this.Quantity.dataSource.filter((val) => {
                let price = 0;
                if (val.product.discount == undefined || val.product.discount == 0) {
                  price = val.product.price;
                } else {
                  price = Number(val.product.price * val.product.discount / 100);
                }
                if (val.product.id == x.id && price >= 750000 && price <= 1000000 && val.quantity > 0) {
                  return x;
                } else {
                  return null;
                }
              })
              if (arr.length > 0) {
                this.listProduct.push(x);
              }
            })
            break;
        }
        this.total = this.listProduct.length;
        this.pageData();
        this.api.loading = false;
      }, (error) => {
        if (error.status == 500) {
          let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
          window.location.href = "/login/" + id;
        } else {
          this.api.Notification.notificationError('');
        }
      })
    }, 1000)
  }
  onChangeHandler(event: any): void {
    this.api.loading = true;
    this.contains = event.target.value;
    if (this.contains == "") {
      return this.Read();
    }
    this.dataSource = this.listProduct.filter((x) => x.name.includes(this.contains)).slice(
      this.skip,
      this.skip + this.pageSize
    );
    this.api.loading = false;
  }
  search(): void {
    if (this.contains == "") {
      return this.Read();
    }
    this.dataSource = this.listProduct.filter((x) => x.name.includes(this.contains)).slice(
      this.skip,
      this.skip + this.pageSize
    );;
  }
  onPageChange(e: PageChangeEvent): void {
    this.skip = e.skip;
    this.pageSize = e.take;
    this.pageData();
  }
  pageData(): void {
    this.dataSource = this.listProduct.slice(
      this.skip,
      this.skip + this.pageSize
    );
  }
  changeStatus(event: any): void {
    this.selectedValue = event;
    this.Read();
  }
}
