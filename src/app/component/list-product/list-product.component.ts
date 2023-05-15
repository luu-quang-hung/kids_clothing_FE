import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { PageChangeEvent, PagerSettings } from "@progress/kendo-angular-listview";
import { MessageService } from 'src/app/shared/message.service';
import { HttpClient } from '@angular/common/http';
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  public listProduct: Array<any> = [];
  public dataSource: any = [];
  public pageSize = 20;
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
      name: 'Giá dưới 100.000'
    },
    {
      id: 2,
      name: 'Giá 100.000 - 250.000 VND'
    },
    {
      id: 3,
      name: 'Giá 250.000 - 500.000 VND'
    },
    {
      id: 4,
      name: 'Giá 500.000 - 750.000 VND'
    },
    {
      id: 5,
      name: 'Giá 750.000 - 1.000.000 VND'
    },
  ];
  public selectedValue = 0;
  public contains: any;
  constructor(private api: ApiService, private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private formBuilder: FormBuilder) {
  }
  public Product: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public Quantity: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);

  ngOnInit(): void {
    this.Product.Controller = "ProductController";
    this.Quantity.Controller = "QuantityController";
    this.Read();
    this.message.receviedFilterProduct().subscribe((rs) => {
    })
  }
  Read(): void {
    this.listProduct = [];
    this.Quantity.loading = true;
    this.Product.Read.Execute().subscribe((res) => {
      this.Product.dataSource = res.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    });
    setTimeout(()=>{
      this.Quantity.Read.Execute().subscribe((res) => {
        this.Quantity.dataSource = res.data;
        switch (this.selectedValue) {
          case 0:
            this.Product.dataSource.map((x) => {
              let arr = this.Quantity.dataSource.filter((val) => val.product.id == x.id && val.quantity > 0)
              if (arr.length > 0) {
                this.listProduct.push(x);
              }
            })
            break;
          case 1:
            this.Product.dataSource.map((x) => {
              let arr = this.Quantity.dataSource.filter((val) =>{
                let price = 0;
                if(val.product.discount == undefined || val.product.discount == 0){
                  price = val.product.price ;
                }else{
                  price = Number(val.product.price * val.product.discount/100) ;
                }
                if( val.product.id == x.id &&  price > 0 && price <= 100000 && val.quantity > 0){
                  return x;
                }else{
                  return null;
                }
              })
              if (arr.length > 0) {
                this.listProduct.push(x);
              }
            })
            break;
          case 2:
            this.Product.dataSource.map((x) => {
              let arr = this.Quantity.dataSource.filter((val) =>{
                let price = 0;
                if(val.product.discount == undefined || val.product.discount == 0){
                  price = val.product.price ;
                }else{
                  price = Number(val.product.price * val.product.discount/100) ;
                }
                if( val.product.id == x.id &&  price >= 100000 && price <= 250000 && val.quantity > 0){
                  return x;
                }else{
                  return null;
                }
              })
              if (arr.length > 0) {
                this.listProduct.push(x);
              }
            })
            break;
            case 3:
              this.Product.dataSource.map((x) => {
                let arr = this.Quantity.dataSource.filter((val) =>{
                  let price = 0;
                  if(val.product.discount == undefined || val.product.discount == 0){
                    price = val.product.price ;
                  }else{
                    price = Number(val.product.price * val.product.discount/100) ;
                  }
                  if( val.product.id == x.id &&  price >= 250000 && price <= 500000 && val.quantity > 0){
                    return x;
                  }else{
                    return null;
                  }
                })
                if (arr.length > 0) {
                  this.listProduct.push(x);
                }
              })
              break;
          case 4:
            this.Product.dataSource.map((x) => {
              let arr = this.Quantity.dataSource.filter((val) =>{
                let price = 0;
                if(val.product.discount == undefined || val.product.discount == 0){
                  price = val.product.price ;
                }else{
                  price = Number(val.product.price * val.product.discount/100) ;
                }
                if( val.product.id == x.id && price >= 500000 && price <= 750000 && val.quantity > 0){
                  return x;
                }else{
                  return null;
                }
              })
              if (arr.length > 0) {
                this.listProduct.push(x);
              }
            })
            break;
          case 5:
            this.Product.dataSource.map((x) => {
              let arr = this.Quantity.dataSource.filter((val) =>{
                let price = 0;
                if(val.product.discount == undefined || val.product.discount == 0){
                  price = val.product.price ;
                }else{
                  price = Number(val.product.price * val.product.discount/100) ;
                }
                if( val.product.id == x.id && price >= 750000 && price <= 1000000 && val.quantity > 0){
                  return x;
                }else{
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
        this.Quantity.loading = false;
      }, (error) => {
        if (error.status == 500) {
          let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
          window.location.href = "/login/" + id;
        } else {
          this.api.Notification.notificationError('');
        }
      })
    },1000)
  }

  onChangeHandler(event: any): void{
    this.api.loading = true;
    this.contains = event.target.value;
    if(this.contains == ""){
      return this.Read();
    }
    this.dataSource = this.listProduct.filter((x) => x.name.includes(this.contains)).slice(
      this.skip,
      this.skip + this.pageSize
    );
    this.api.loading = false;
  }
  search(): void{
    if(this.contains == ""){
      return this.Read();
    }
    this.dataSource = this.listProduct.filter((x) => x.name.includes(this.contains)).slice(
      this.skip,
      this.skip + this.pageSize
    );;
  }

  changeStatus(event: any): void {
    this.selectedValue = event;
    this.Read();
  }

  public onPageChange(e: PageChangeEvent): void {
    this.skip = e.skip;
    this.pageSize = e.take;
    this.pageData();
  }

  private pageData(): void {
    this.dataSource = this.listProduct.slice(
      this.skip,
      this.skip + this.pageSize
    );
  }
}
