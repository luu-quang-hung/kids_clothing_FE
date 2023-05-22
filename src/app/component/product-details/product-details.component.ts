import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterContentInit, DoCheck, ViewChild, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormBuilder, } from "@angular/forms";
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'src/app/shared/message.service';
import SwiperCore, { Pagination, SwiperOptions, Autoplay, Navigation, Thumbs } from "swiper";
import { QuanityModel } from './quantity.model';
SwiperCore.use([Pagination]);
SwiperCore.use([Autoplay]);
SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild("template", { read: TemplateRef })
  public notificationTemplate: TemplateRef<any> | undefined;
  public infoProduct: any;
  public listImageProduct: Array<any> = [];
  public listTypeSize: Array<any> = [];
  public listSize: Array<any> = [];
  public listProductByCategory: Array<any> = [];
  public listProductByQuantity: Array<any> = [];
  public listProperty: Array<any> = [];
  public listPropertyByQuantity: Array<any> = [];
  public listSizeByQuantity: Array<any> = [];
  public productDetailQuantity: any;
  public isDisabled: boolean;
  public sizes: any;
  public badge = 0;
  public dataSource: Array<any> = [];
  public QuantityObj: QuanityModel = new QuanityModel();
  public isDiscount = false;
  public newPrice = 0;
  public formGroup = new FormGroup({
    property: new FormControl(),
    size: new FormControl(),
  });
  public defaultItem: any = {
    name: "Choose...",
    id: null,
  };

  public config: SwiperOptions = {
    freeMode: true,
    pagination: { clickable: true },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      410: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      540: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 480px
      720: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      // when window width is >= 640px
      960: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1140: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    },
    autoplay: {
      delay: 5000,
    },
  };
  public thumbsSwiper: any;

  constructor(private api: ApiService, private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private formBuilder: FormBuilder) {
      this.isDisabled = false; 
  }
  public Product: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public TypeSize: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public Size: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public Quantity: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public Property: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public Image: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);

  ngOnInit(): void {
    let url = window.location.href;
    let id = url.replace('http://localhost:4200/list-product/info/', '');
    this.QuantityObj.Quantity = 1;

    this.Product.Controller = "ProductController";
    this.TypeSize.Controller = "TypeSizeController";
    this.Size.Controller = "SizeController";
    this.Quantity.Controller = "QuantityController";
    this.Property.Controller = "PropertyController";
    this.Image.Controller = "ImageController";

    this.Product.getApi('Customer/' + this.Product.Controller + '/findProductById/' + id).subscribe((res) => {
      if (res.data.discount != null) {
        this.isDiscount = true;
        this.newPrice = Number(res.data.price * (100 - res.data.discount)) / 100;
        this.QuantityObj.newPrice = this.newPrice;
      }
      let description = res.data.description;
      let descriptionDetail = res.data.descriptionDetail;
      this.infoProduct = res.data;
      if (this.infoProduct.description != null) {
        this.infoProduct.description = decodeURIComponent(description.replace(/\+/g, ""));
      }
      if (this.infoProduct.descriptionDetail != null) {
        this.infoProduct.descriptionDetail = decodeURIComponent(descriptionDetail.replace(/\+/g, " "));
      }
      this.QuantityObj.Product = res.data;
    }, (error) => {
      alert('Bạn không có quyền dùng chức năng này')
      window.location.href = "/login"
    })
    this.Product.getApi('Customer/' + this.Product.Controller + '/GetProductByCategory/' + id).subscribe((res) => {
      this.listProductByCategory = res.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    })
    this.TypeSize.Read.Execute().subscribe((res) => {
      this.listTypeSize = res.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    });
    this.Quantity.Read.Execute().subscribe((rs) => {
      this.Quantity.dataSource = rs.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    })
    this.Quantity.getApi('Customer/' + this.Quantity.Controller + '/findQuantityByProduct/' + id).subscribe((res) => {
      this.listProductByQuantity = res.data;
      if (res.status) {
        this.Property.Read.Execute().subscribe((rs) => {
          this.listProductByQuantity.map((val: any, idx: any) => {
            let data = rs.data.filter((x: any) => x.idproperty == val.property.idproperty);
            if (data.length > 0) {
              if (this.listProperty.length == 0) {
                this.listProperty.push(data[0]);
              } else {
                let color_same = this.listProperty.filter((x: any) => {
                  if (x.idproperty == data[0].idproperty)
                    return x;
                  else
                    return null;
                });
                if (color_same.length == 0) {
                  this.listProperty.push(data[0]);
                }
              }
            }
          })
          this.QuantityObj.Property = this.listProperty[0];
          this.formGroup.controls.property.setValue(String(this.listProperty[0].idproperty));

          ///List size theo màu sản phẩm/////
          this.listSizeByQuantity = [];
          let SizeByProperty = this.listProductByQuantity.filter((x) => x.idproperty == this.listProperty[0].idproperty);
          SizeByProperty.map((x) => {
            this.listSizeByQuantity.push(x.size);
          })
          this.QuantityObj.Size = this.listSizeByQuantity[0];
          this.formGroup.controls.size.setValue(this.listSizeByQuantity[0]);
        }, (error) => {
          alert('Bạn không có quyền dùng chức năng này')
          window.location.href = "/login"
        })
        this.Size.Read.Execute().subscribe((rs) => {
          this.listProductByQuantity.map((val: any, idx: any) => {
            let data = rs.data.filter((x: any) => x.id == val.size.id);
            if (data.length > 0) {
              if (this.listSize.length == 0) {
                this.listSize.push(data[0]);
              } else {
                let size_same = this.listSize.filter((x: any) => {
                  if (x.id == data[0].id)
                    return x;
                  else
                    return null;
                });
                if (size_same.length == 0) {
                  this.listSize.push(data[0]);
                }
              }
            }
          })
          this.QuantityObj.Size = this.listSize[0];
          this.formGroup.controls.size.setValue(this.listSize[0]);
        }, (error) => {
          alert('Bạn không có quyền dùng chức năng này')
          window.location.href = "/login"
        })
      }
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    })
    this.Image.getApi('manager/image/list/' + id).subscribe((res) => {
      this.listImageProduct = res.data;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    })

       // ---------------------------------------------------
      this.Product.getApi('Customer/ProductDetailController/findByAlls?idProduct=' + id +
      `&idSize=&idProperty=`
      ).subscribe((res) => {
        this.productDetailQuantity = res.data.quantity;
        this.isDisabled = this.productDetailQuantity <= 0;
 
      }, (error) => {
    
      })
   // ===================================================
  }

  changeProperty(e: any): void {
    this.listSizeByQuantity = [];
    let property = this.listProperty.filter((x: any) => x.idproperty == e.idproperty);
    this.QuantityObj.Property = property[0];

    /////Khi tìm sản phẩm theo màu sắc danh mục size sẽ select mảng đầu tiên////////
    let SizeByProperty = this.listProductByQuantity.filter((x) => x.idproperty == e.idproperty);
    SizeByProperty.map((x) => {
      this.listSizeByQuantity.push(x.size);
    })
    this.QuantityObj.Size = this.listSizeByQuantity[0];
    // ---------------------------------------------------
    this.formGroup.controls.size.setValue(this.listSizeByQuantity[0]);
    const sizeValue = this.formGroup.controls.size.value;
    let url = window.location.href;
    let id = url.replace('http://localhost:4200/list-product/info/', '');
    this.Product.getApi('Customer/ProductDetailController/findByAlls?idProduct=' + id +
    `&idSize=` + sizeValue.id + `&idProperty=` + e.idproperty
    ).subscribe((res) => {
      this.productDetailQuantity = res.data.quantity;
      this.isDisabled = this.productDetailQuantity <= 0;

    }, (error) => {
  
    })
    // ===================================================
  }
  changeSize(value: any): void {
    this.QuantityObj.Size = value;
     // ---------------------------------------------------
     this.formGroup.controls.property.setValue(String(this.listProperty[0].idproperty));
     const propertyValue = this.formGroup.controls.property.value;
     let url = window.location.href;
     let id = url.replace('http://localhost:4200/list-product/info/', '');
     this.Product.getApi('Customer/ProductDetailController/findByAlls?idProduct=' + id +
     `&idSize=` + value.id + `&idProperty=` + propertyValue
     ).subscribe((res) => {
       this.productDetailQuantity = res.data.quantity;
       this.isDisabled = this.productDetailQuantity <= 0;

     }, (error) => {
   
     })
     // ===================================================
  }
  changeQuantity(value: any): void {
    this.QuantityObj.Quantity = value;
  }

  addSoppingCart(): void {
    if( this.QuantityObj.Quantity < 0){
      return this.Quantity.Notification.notificationWarning("Không được nhập số âm");
    }
    this.dataSource = [];
    let key = Object.keys(localStorage);
    let charset: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let random1: string = [...Array(10)]
      .map((x: any) => charset[Math.floor(Math.random() * charset.length)])
      .join("");
    key.map((x) => {
      this.dataSource.push(JSON.parse(String(localStorage.getItem(x))))
    });
    let anotherProduct = this.dataSource.filter((x) => x.Product.id == this.QuantityObj.Product.id);
    if (localStorage.length == 0 || anotherProduct.length == 0) {
      let getIdQuantity = this.listProductByQuantity.find(x => x.idProduct == this.QuantityObj.Product.id &&
        x.property.idproperty == this.QuantityObj.Property.idproperty &&
        x.size.id == this.QuantityObj.Size.id);
      if (getIdQuantity != undefined) {
        this.QuantityObj.Id = random1;
        this.QuantityObj.IdQuantity = getIdQuantity.id;
        localStorage.setItem(random1, JSON.stringify(this.QuantityObj));
        this.badge = localStorage.length;
        this.message.SendBadgeCart(this.badge);
      }
    } else {
      let same_cart = anotherProduct.filter((x) => {
        if (x.Product.id == this.QuantityObj.Product.id &&
          x.Property.idproperty == this.QuantityObj.Property.idproperty &&
          x.Size.id == this.QuantityObj.Size.id) {
          return this.QuantityObj;
        } else {
          return null;
        }
      });
      if (same_cart.length == 0) {
        let getIdQuantity = this.listProductByQuantity.find((x) => x.idProduct == this.QuantityObj.Product.id &&
          x.property.idproperty == this.QuantityObj.Property.idproperty &&
          x.size.id == this.QuantityObj.Size.id);
        if (getIdQuantity != undefined) {
          this.QuantityObj.Id = random1;
          this.QuantityObj.IdQuantity = getIdQuantity.id;
          localStorage.setItem(random1, JSON.stringify(this.QuantityObj));
          this.badge = localStorage.length;
          this.message.SendBadgeCart(this.badge);
        }
      } else {
        same_cart[0].Quantity = this.QuantityObj.Quantity + same_cart[0].Quantity;
        localStorage.setItem(same_cart[0].Id,JSON.stringify(same_cart[0]));
      }
    }
  }
}
