import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { PageChangeEvent, PagerSettings } from "@progress/kendo-angular-listview";
import { NotificationService } from '@progress/kendo-angular-notification';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { MessageService } from 'src/app/shared/message.service';
import { QuanityModel } from './quantity.model';
@Component({
  selector: 'app-list-product-by-category',
  templateUrl: './list-product-by-category.component.html',
  styleUrls: ['./list-product-by-category.component.css']
})
export class ListProductByCategoryComponent implements OnInit {
  public getId: any;
  public content: String | undefined;
  public listProduct: Array<any> = [];
  public dataSource: any = [];
  public pageSize = 12;
  public skip = 0;
  public pagedDestinations = [];
  public total = 0;
  public QuantityObj: QuanityModel = new QuanityModel();
  public listProductByQuantity: Array<any> = [];

    // ...


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

  constructor(public api: ApiService, private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private formBuilder: FormBuilder) {
  }
  public Product: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public Quantity: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);

  ngOnInit(): void {
//
    let url = window.location.href;
    let name = url.replace('http://localhost:4200/collection/', '');
    this.api.Controller = "CategoryDetailController";
    this.Quantity.Controller = "QuantityController";
    this.api.Read.Execute().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        this.removeVietnameseTones(res[i].name);
        if (this.content == name) {
          this.getId = res[i].id;
          this.Read();
          break;
        }
      }
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    })
  }
  Read(): void {
    this.api.loading = true;
    this.api.getApi('Customer/ProductController/collection/' + this.getId).subscribe((res) => {
      this.api.dataSource = res.data;
      this.total = res.data.length;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    })
    setTimeout(()=>{
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
              let arr = this.Quantity.dataSource.filter((val) =>{
                let price = 0;
                if(val.product.discount == undefined || val.product.discount == 0){
                  price = val.product.price ;
                }else{
                  price = Number(val.product.price * val.product.discount/100) ;
                }
                if( val.product.id == x.id && price <= 100000 && val.quantity > 0){
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
            this.api.dataSource.map((x) => {
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
              this.api.dataSource.map((x) => {
                let arr = this.Quantity.dataSource.filter((val) =>{
                  let price = 0;
                  if(val.product.discount == undefined || val.product.discount == 0){
                    price = val.product.price ;
                  }else{
                    price = Number(val.product.price * val.product.discount/100) ;
                  }
                  if( val.product.id == x.id && price >= 250000 && price <= 500000 && val.quantity > 0){
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
            this.api.dataSource.map((x) => {
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
            this.api.dataSource.map((x) => {
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
        this.api.loading = false;
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
  removeVietnameseTones(str: any): void {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/\s/g, "-");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|{|}|\||\\/g, " ");
    this.content = str;
    return str;
  }
  public badge = 0;

  addSoppingCart(): void {
    alert("thêm sản phầm vào giỏ hàng")
  }
}
