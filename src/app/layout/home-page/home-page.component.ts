import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public items: any[] = [
    { title: "Flower", url: "https://cdn.pancake.vn/1/s1200x600/03/a0/ff/80/6b71dff68f9b03f366d72665e81bf879eed66ccc9c283b445aba6e29.gif" },
    { title: "Mountain", url: "https://bizweb.dktcdn.net/100/302/397/themes/754809/assets/slider_2.jpg?1614149879141" },
    { title: "Sky", url: "https://kscloset.vn/pub/media/catalog/category/he-soi-dong.png" },
  ];
  public listProduct: Array<any> = [];
  public listProductDiscount: Array<any> = [];
  public width = "100%";
  public height = "600px";

  constructor(private api: ApiService, private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private formBuilder: FormBuilder) {
  }
  public Product: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public Quantity: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);


  ngOnInit(): void {
    this.Product.Controller = "ProductController";
    this.Quantity.Controller = "QuantityController";
    this.Product.getApi('Customer/ProductController/home').subscribe((res) => {
      this.Product.dataSource = res.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    } );
    setTimeout(() => {
      this.Quantity.Read.Execute().subscribe((res) => {
        let arrProductDiscount: any[] = [];
        let arrProductNew: any[] = [];
        this.Quantity.dataSource = res.data;
        this.Product.dataSource.map((x) => {
          let arr = this.Quantity.dataSource.filter((val) => val.product.id == x.id && val.quantity > 0);
          let arr_2 = this.Quantity.dataSource.filter((val) => val.product.id == x.id && val.product.discount > 0 && val.quantity > 0)
          if (arr.length > 0) {
            arrProductNew.push(x);
          }
          if (arr_2.length > 0) {
            arrProductDiscount.push(x);
          }
        })
        this.listProduct = arrProductNew.slice(0, 8);
        this.listProductDiscount = arrProductDiscount.slice(0, 8);
      }, (error) => {
        if (error.status == 500) {
          let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
          window.location.href = "/login/" + id;
        } else {
          this.api.Notification.notificationError('');
        }
      })
    }, 2000)
  }

}
