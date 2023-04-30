import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { DrawerItem, DrawerMode } from '@progress/kendo-angular-layout';
import { BreadCrumbItem } from '@progress/kendo-angular-navigation';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Align } from '@progress/kendo-angular-popup';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class HeaderComponent implements OnInit {
  public expanded = false;
  public autoCollapse = true;
  public username: any = sessionStorage.getItem('USERNAME');

  public pathDrawItems: Array<any> = [];
  public drawItems: Array<any> = [
    {
      text: "Trang chủ",
      path: "",
    },
    {
      text: "Giới thiệu",
      path: "introduce",
    },
    {
      text: "Sản phẩm",
      children: [

      ]
    },
    {
      text: "Liên hệ",
      path: "contact"
    },
  ];
  public draw_items: Array<any> = [];
  public expandMode: DrawerMode = "overlay";
  public listProduct: Array<any> = [];
  public items: Array<any> = []; // menu item router
  public itemsParent: Array<any> = []; // menu items cha 
  public itemsChild: Array<any> = []; // menu items con
  public productByName: any;
  public url: string | undefined;
  public showLogin: boolean = true;
  public showAvatar: boolean = false;
  public badge = localStorage.length;
  public menu: Array<any> = [
    {
      text: "Trang chủ",
      path: "",
      expanded: false,
    },
    {
      text: "Giới thiệu",
      path: "introduce",
      expanded: false,
    },
    {
      text: " Sản phẩm",
      items: [

      ],
      expanded: false,
    },
    {
      text:"Liên hệ",
      path: "contact",
      expanded: false,
    },
  ];
  public breadcrumb: BreadCrumbItem[] = [
    {
      text: "Trang chủ",
      icon: "home",
    },
  ];
  Account: any;

  public onExpandModeChange(checked: boolean): void {
    this.expandMode = checked ? "overlay" : "push";
  }
  constructor(private message: MessageService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private formBuilder: FormBuilder) { }

  public api: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
  public api_2: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);

  ngOnInit(): void {
    this.api.Controller = 'CategoryController';
    this.api_2.Controller = 'CategoryDetailController';
    this.api.getApi('Customer/ProductController/home').subscribe((rs) => {
      this.listProduct = rs.data;
    })
    this.api.Read.Execute().subscribe((res) => {
      this.itemsParent = res;
    }, (error) => {
      if (error.status == 500) {
        let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
        window.location.href = "/login/" + id;
      } else {
        this.api.Notification.notificationError('');
      }
    });
    setTimeout(() => {
      this.api_2.Read.Execute().subscribe((res) => {
        this.itemsChild = res;
        this.mapItems();
      }, (error) => {
        if (error.status == 500) {
          let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
          window.location.href = "/login/" + id;
        } else {
          this.api.Notification.notificationError('');
        }
      })
    }, 1000);
    if (sessionStorage.getItem("USERNAME") != null) {
      this.showLogin = false;
      this.showAvatar = true;
    }
    this.message.receivedMessage().subscribe((rs) => {
      this.badge = rs;
    })
    this.message.receivedTokenAccount().subscribe((rs) => {
      this.showAvatar = true;
      this.showLogin = false;
    })
    this.setBreadcrumb();

    console.log(sessionStorage.getItem('USERNAME'))
  
  }
  openLogin(): void {
    window.location.href = '/login';
  }
  signOut(): void {
    sessionStorage.removeItem('USERNAME');
    sessionStorage.removeItem('TOKEN');
    this.showLogin = true;
    this.showAvatar = false;
    window.location.href = "/login"
  }
  changeFilterName(event: any): void {
    this.productByName = event.target.value;
  }
  searchProduct(): void {
    window.location.href = "/search/" + this.productByName;
  }
  //-------convert categorydetail thành menu item-------//
  mapItems(): void {
    this.itemsParent.map((x) => {
      let routeChild = this.itemsChild.filter((val) => val.category.id == x.id);
      let arr: { text: string; path: string; }[] = [];
      let menu_item = {
        text: '',
        path: '',
        items: {},
      }
      let drawer_item = {
        text: '',
        path: '',
        expanded: false,
        children: {},
      }
      routeChild.map((val) => {
        this.removeVietnameseTones(val.name)
        let menu_item_child = {
          text: '',
          path: ''
        }
        menu_item_child.text = val.name;
        menu_item_child.path = '/collection/' + this.url;
        arr.push(menu_item_child);
      })
      menu_item.text = x.name;
      menu_item.items = arr;
      drawer_item.text = x.name;
      drawer_item.children = arr;
      this.items.push(menu_item);
      this.draw_items.push(drawer_item);
    })
    this.menu[2].items = this.items;
    this.drawItems[2].children = this.draw_items;
    this.pathDrawItems = this.resetItems();
  }
  //-------Breadcrumb-------//
  setBreadcrumb() {
    let url = window.location.href.replace(window.location.origin, '');
  }
  //-------DrawerItem-------//
  onSelect(event: any): void {
    this.autoCollapse = false;
    if (!event.item.hasOwnProperty('children')) {
      window.location.href = event.item.path
    } else {
      const text = event.item.text;
      const newItems = this.pathDrawItems;
      const index = newItems.findIndex((i:any) => i.text === text);
      if(newItems[index].selected){
        newItems[index].expanded = false;
        newItems[index].selected = false;
        this.pathDrawItems = this.resetItems();
      }else{
        newItems[index].selected = true;
        if (!event.item.expanded) {
          newItems[index].expanded = true;
          this.addChildren(newItems, index, newItems[index].children);
        }
      }
    }
  }
  public addChildren(arr: any, index: any, children: Array<any>) {
    arr.splice(index + 1, 0, ...children);
  }
  public resetItems(): Array<any> {
    const arr: any[] = [];
    this.drawItems.forEach((item) => {
      arr.push(Object.assign({}, item));
    });
    return arr;
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
    this.url = str;
    return str;
  }
}