import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { DialogCloseResult, DialogRef, DialogService, WindowService } from '@progress/kendo-angular-dialog';
import { NotificationService } from '@progress/kendo-angular-notification';
import { MessageService } from './message.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { EditService, GridDataResult } from '@progress/kendo-angular-grid';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GroupDescriptor, State, process, DataResult } from '@progress/kendo-data-query';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public Controller: String | undefined;
  public formGroup !: FormGroup;
  public status: String | undefined;
  public dataSource: Array<any> = [];
  public typeData: String = "grid";
  public createdItems: any[] = [];
  public updatedItems: any[] = [];
  public deletedItems: any[] = [];
  public isManager = false;
  public loading = false;
  public state: any;
  public serviceGrid = {
    aggregates: {},
    field: "",
    items: [null],
    value: "",
  };
  public windowRef: any;
  public dialogRef!: DialogRef;
  constructor(public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
    private notificationService: NotificationService, private message: MessageService, private formBuilder: FormBuilder) {
  }

  getHeader() {
    let token = sessionStorage.getItem("TOKEN");
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }
  getApi(url: any) {
    let getHeader = this.getHeader();
    if (getHeader instanceof HttpHeaders) {
      return this.http.get('http://localhost:8080/' + url, { headers: getHeader })
        .pipe(map((res: any) => {
          return res;
        }))
    } else {
      return this.http.get('http://localhost:8080/' + url)
        .pipe(map((res: any) => {
          return res;
        }))
    }
  }
  postApi(url: any, data: any) {
    this.loading = true;
    let getHeader = this.getHeader();
    if (getHeader instanceof HttpHeaders) {
      return this.http.post('http://localhost:8080/' + url, data, { headers: getHeader })
        .pipe(map((res: any) => {
          return res;
        }), tap(() => {
          this.loading = false
        }))
    } else {
      return this.http.post('http://localhost:8080/' + url, data)
        .pipe(map((res: any) => {
          return res;
        }), tap(() => {
          this.loading = false
        }))
    }
  }
  public OpenWindow = {
    _: this,
    title: '',
    Width: 1200,
    Height: 650,
    top: -70,
    left: -120,
    After: function (windowRef: any) {
      return windowRef;
    },
    Execute: function (component: any, data: any, status: any) {
      let windowRef = this._.windowService.open({
        title: this.title,
        content: component,
        width: this.Width,
        height: this.Height,
        top: this.top,
        left: this.left
      })
      this._.windowRef = windowRef;
      const getInfoWindow = windowRef.content.instance;
      if (status == "EDIT") {
        getInfoWindow.dataSource = data.dataItem;
      } else {
        getInfoWindow.dataSource = data;
      }
      if (this._.formGroup != undefined) {
        getInfoWindow.formGroup = this._.formGroup;
        getInfoWindow.status = status;
      }
      getInfoWindow.Base = this._;
      this.After(windowRef);
    },
  }
  public DialogWindow = {
    _: this,
    title: "",
    content: "",
    width: 300,
    height: 125,
    DialogDelete: function () {
      const dialog: DialogRef = this._.dialogService.open({
        title: this.title,
        content: this.content,
        actions: [{ text: "Không" }, { text: "Đồng ý", primary: true }],
        width: this.width,
        height: this.height,
      })
      this._.dialogRef = dialog;
    }
  }
  public Notification = {
    _: this,
    notificationExecute: function (data: any) {
      if (data.status) {
        this._.notificationService.show({
          content: data.message,
          animation: { type: "fade", duration: 800 },
          type: { style: 'success', icon: true },
          position: { horizontal: 'right', vertical: 'top' }
        })
      } else {
        this._.notificationService.show({
          content: data.message,
          animation: { type: "fade", duration: 800 },
          type: { style: 'error', icon: true },
          position: { horizontal: 'right', vertical: 'top' }
        })
      }
    },
    notificationWarning: function (content: any) {
      this._.notificationService.show({
        content: content,
        animation: { type: "fade", duration: 800 },
        type: { style: 'warning', icon: true },
        position: { horizontal: 'right', vertical: 'top' }
      })
    },
    notificationSuccess: function (content: any) {
      this._.notificationService.show({
        content: content,
        animation: { type: "fade", duration: 800 },
        type: { style: 'success', icon: true },
        position: { horizontal: 'right', vertical: 'top' }
      })
    },
    notificationError: function (content: any) {
      this._.notificationService.show({
        content: content,
        animation: { type: "fade", duration: 800 },
        type: { style: 'error', icon: true },
        position: { horizontal: 'right', vertical: 'top' }
      })
    }
  }
  public Grid = {
    _: this,
    oldState: [null],
    newState: [null],
    rowIndex: [null],
    isGrouping: false,
    cancelHandler: function (event: any) {
      event.sender.closeRow(event.rowIndex);
      return event;
    },
    addHandler: function (event: any) {
      event.sender.addRow(this._.formGroup);
      return event;
    },
    saveHandler: function (event: any) {
      this.newState = [];
      this._.createdItems.push(event.dataItem);
      if (this.isGrouping == true) {
        this.oldState = this._.dataSource;
        for (let i = 0; i < this._.dataSource.length; i++) {
          this.newState.push(this._.dataSource[i]);
        }
        this.newState.unshift(event.dataItem);
      } else {
        this.oldState = event.sender.data.data;
        for (let i = 0; i < event.sender.data.data.length; i++) {
          this.newState.push(event.sender.data.data[i]);
        }
        this.newState.unshift(event.dataItem);
      }
      this._.message.SendDataBehavior(this.newState);
      return event;
    },
    removeHandler: function (event: any) {
      this.newState = [];
      this._.deletedItems.push(event.dataItem);
      if (this.isGrouping == true) {
        this.oldState = this._.dataSource;
        for (let i = 0; i < this._.dataSource.length; i++) {
          this.newState.push(this._.dataSource[i]);
        }
        this.newState.map((val, idx) => {
          if (JSON.stringify(val) == JSON.stringify(event.dataItem)) {
            this.newState.splice(idx, 1);
          }
        })
      } else {
        this.oldState = event.sender.data.data;
        this.newState = this.oldState.filter((val, idx) => {
          return idx !== event.rowIndex;
        })
      }
      this._.createdItems.map((val, idx) => {
        if (JSON.stringify(val) == JSON.stringify(event.dataItem)) {
          this._.createdItems.splice(idx, 1);
          this._.deletedItems.map((value, index) => {
            if (JSON.stringify(value) == JSON.stringify(event.dataItem)) {
              this._.deletedItems.splice(index, 1);
            }
          })
        }
      })
      this._.updatedItems.map((val, idx) => {
        if (JSON.stringify(val) == JSON.stringify(event.dataItem)) {
          this._.updatedItems.splice(idx, 1);
          this._.deletedItems.map((value, index) => {
            if (JSON.stringify(value) == JSON.stringify(event.dataItem)) {
              this._.deletedItems.splice(index, 1);
            }
          })
        }
      })
      this._.message.SendDataBehavior(this.newState);
      return event;
    },
    cellClickHandler: function (event: any) {
      if (!event.isEdited) {
        let arr = Object.keys(event.dataItem);
        this._.formGroup = this._.formBuilder.group({});
        for (let key of arr) {
          this._.formGroup.addControl(key, new FormControl());
          this._.formGroup.controls[key].setValue(event.dataItem[key]);
        }
        event.sender.editCell(event.rowIndex, event.columnIndex, this._.formGroup);
      }
      return event;
    },
    cellCloseHandler: function (event: any) {
      this.newState = [];
      const { formGroup, dataItem } = event;
      this.oldState = event.sender.data.data;
      if (this.isGrouping) {
        event.sender.data.data.map((val: any) => {
          val.items.map((x: any) => {
            this.newState.push(x)
          })
        })
      } else {
        event.sender.data.data.map((val: any) => {
          this.newState.push(val)
        })
      }
      if (!formGroup.valid) {
        event.preventDefault();
      } else if (formGroup.dirty) {
        if (this._.updatedItems.length == 0) {
          this._.updatedItems.push(formGroup.value);
        } else {
          this._.updatedItems.map((val, idx) => {
            if (JSON.stringify(val) == JSON.stringify(event.dataItem)) {
              this._.updatedItems.splice(idx, 1);
            }
          })
          this._.updatedItems.push(formGroup.value);
        }
        for (let i = 0; i < this.newState.length; i++) {
          if (JSON.stringify(this.newState[i]) == JSON.stringify(event.dataItem)) {
            this.newState[i] = formGroup.value;
            this._.createdItems.map((value, index) => {
              if (JSON.stringify(value) == JSON.stringify(event.dataItem)) {
                this._.createdItems.splice(index, 1);
              }
            })
            this._.message.SendDataBehavior(this.newState);
            break;
          }
        }
      }
      return event;
    }
  }
  public Read = {
    _: this,
    Execute: function () {
      if (sessionStorage.getItem('ROLE') == 'ADMIN' || this._.isManager == true) {
        let getHeader = this._.getHeader();
        if (getHeader instanceof HttpHeaders) {
          return this._.http.get('http://localhost:8080/Manager/' + this._.Controller + '/findAllByIsDeleteFalse', { headers: getHeader })
            .pipe(map((res: any) => {
              return res;
            }), tap(() => {
              this._.loading = false
            }))
        } else {
          return this._.http.get('http://localhost:8080/Manager/' + this._.Controller + '/findAllByIsDeleteFalse')
            .pipe(map((res: any) => {
              return res;
            }), tap(() => {
              this._.loading = false
            }))
        }
      } else {
        return this._.http.get('http://localhost:8080/Customer/' + this._.Controller + '/findAllByIsDeleteFalse')
          .pipe(map((res: any) => {
            return res;
          }))
      }
    },
    After: function () { },
  }
  public Create = {
    _: this,
    Default: function (row: any) {
      return row;
    },
    CreateDataGrid: function (data: any) {
      let arr = Object.keys(data[0]);
      this._.formGroup = this._.formBuilder.group({});
      for (let key of arr) {
        this._.formGroup.addControl(key, new FormControl());
        this._.formGroup.controls[key].setValue('');
      }
    },
    CreateDataPopup: function (component: any, data: any) {
      let arr = Object.keys(data);
      this._.formGroup = this._.formBuilder.group({});
      for (let key of arr) {
        this._.formGroup.addControl(key, new FormControl());
        this._.formGroup.controls[key].setValue('');
      }
      this._.OpenWindow.Execute(component, data, "CREATE");
      return;
    },
    Execute: function (component: any, data: any) {
      this._.status = "CREATE";
      if (this._.typeData == "grid") {
        this.CreateDataGrid(data);
      } else {
        this.CreateDataPopup(component, data);
      }
      return;
    },
  }
  public Edit = {
    _: this,
    Default: function (row: any) {
      return row;
    },
    Execute: function (component: any, event: any) {
      this._.status = "EDIT";
      let arr = Object.keys(event.dataItem);
      this._.formGroup = this._.formBuilder.group({});
      for (let key of arr) {
        this._.formGroup.addControl(key, new FormControl());
        this._.formGroup.controls[key].setValue(event.dataItem[key]);
      }
      this.Default(this._.formGroup.controls)
      this._.OpenWindow.Execute(component, event, "EDIT");
      return;
    }
  }
  public Update = {
    _: this,
    Data: function () {

    },
    Before: function () {
      this._.loading = true;
      return this._.loading;
    },
    Execute: function (data: any) {
      if (this._.typeData == "grid") {
        this.UpdateDataGrid(data).subscribe();
      } else if (this._.typeData == "popup") {
        this.UpdateDataWindow(data).subscribe();
      }
    },
    UpdateDataGrid: function (grid: any) {
      this._.loading = true;
      const formData = new FormData();
      formData.append("createdItems", JSON.stringify(this._.createdItems));
      formData.append("updatedItems", JSON.stringify(this._.updatedItems));
      formData.append("deletedItems", JSON.stringify(this._.deletedItems));
      this._.Grid.oldState = grid.data.data;
      let url = "http://localhost:8080/Manager/" + this._.Controller + "/updateInline";
      let getHeader = this._.getHeader();
      if (getHeader instanceof HttpHeaders) {
        return this._.http.post(url, formData, { headers: getHeader }).pipe(map((res: any) => {
          if (res.status) {
            this._.Notification.notificationExecute(res);
            this._.message.SendDataAfterUpdate(res);
          } else {
            this._.Notification.notificationExecute(res);
          }
          this.UpdateAfterGrid(res);
          return res;
        }), tap(() => {
          this._.loading = false
        }))
      } else {
        return this._.http.post(url, formData).pipe(map((res: any) => {
          if (res.status) {
            this._.Notification.notificationExecute(res);
            this._.message.SendDataAfterUpdate(res);
          } else {
            this._.Notification.notificationExecute(res);
          }
          this.UpdateAfterGrid(res);
          return res;
        }), tap(() => {
          this._.loading = false
        }))
      }
    },
    UpdateDataWindow: function (data: any) {
      this._.loading = true;
      let url = "http://localhost:8080/Manager/" + this._.Controller + "/saveAndFlush";
      let getHeader = this._.getHeader();
      if (getHeader instanceof HttpHeaders) {
        return this._.http.post(url, data, { headers: getHeader }).pipe(map((res: any) => {
          if (res.status) {
            res.type = this._.status;
            this._.Notification.notificationExecute(res);
          } else {
            this._.Notification.notificationExecute(res);
          }
          this.UpdateAfterWindow(res);
          return res;
        }), tap(() => {
          this._.loading = false
        }))
      } else {
        return this._.http.post(url, data).pipe(map((res: any) => {
          if (res.status) {
            res.type = this._.status;
            this._.Notification.notificationExecute(res);
          } else {
            this._.Notification.notificationExecute(res);
          }
          this.UpdateAfterWindow(res);
          return res;
        }), tap(() => {
          this._.loading = false
        }))
      }
    },
    UpdateAfterWindow: function (res: any) {
      if (this._.status == "CREATE") {
        this._.dataSource = this._.dataSource.concat(res.data);
      } else if (this._.status == "EDIT") {
        const index = this._.dataSource.findIndex(x => x.id === res.data.id);
        let newState = this._.dataSource.map((value, idx) => {
          return idx === index ? res.data : value;
        });
        this._.dataSource = newState;
      } else if (this._.status == "DELETE") {
        const index = this._.dataSource.findIndex(x => x.id === res.data.id);
        let newState = this._.dataSource.filter((value, idx) => {
          return idx !== index;
        });
        this._.dataSource = newState;
      }
      this._.windowRef.close();
      this._.message.SendDataAfterUpdate(res);
      return res;
    },
    UpdateAfterGrid: function (res: any) {
      this._.createdItems = [];
      this._.updatedItems = [];
      this._.deletedItems = [];
      return res;
    }
  }
  public Destroy = {
    _: this,
    Execute: function (url: any, data: any) {
      let getHeader = this._.getHeader();
      this._.DialogWindow.content = "Bạn chắc chắn muốn xóa hàng này ?"
      this._.DialogWindow.DialogDelete();
      this._.dialogRef.result.subscribe((rs: any) => {
        if (!rs.primary) {
          return;
        } else {
          this.Data(url, data).subscribe();
        }
      })
    },
    Data: function (url: any, data: any) {
      let getHeader = this._.getHeader();
      this._.loading = true;
      if (getHeader instanceof HttpHeaders) {
        return this._.http.post('http://localhost:8080/Manager/' + this._.Controller + '/delete', data, { headers: getHeader }).pipe(map((res: any) => {
          if (res.status) {
            res.type = this._.status;
            this._.Notification.notificationExecute(res);
            this._.message.SendDataAfterUpdate(res);
          } else {
            this._.Notification.notificationExecute(res);
          }
          this._.loading = false;
        }))
      } else {
        return this._.http.post('http://localhost:8080/Manager/' + this._.Controller + '/delete', data).pipe(map((res: any) => {
          if (res.status) {
            res.type = this._.status;
            this._.Notification.notificationExecute(res);
            this._.message.SendDataAfterUpdate(res);
          } else {
            this._.Notification.notificationExecute(res);
          }
          this._.loading = false;
        }))
      }
    }
  }
}

