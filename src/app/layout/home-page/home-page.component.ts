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
    { title: "Flower", url: "https://i.pinimg.com/originals/6c/52/58/6c52584568600f7c77f91f49be6ea1b4.jpg" },
    { title: "Mountain", url: "https://cdn.shopify.com/s/files/1/2595/4890/files/main-banner-1_3b5bf70a-0c67-4a9a-a718-591a5e523437_1400x.progressive.png.jpg?v=1559885493" },
    { title: "Sky", url: "https://cdn.shopify.com/s/files/1/0064/5667/2338/files/August-website-banner-1_1024x1024.jpg?v=1618915575" },
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
