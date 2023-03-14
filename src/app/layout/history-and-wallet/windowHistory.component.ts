import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { EventManager } from "@angular/platform-browser";
import { DialogService, WindowService } from "@progress/kendo-angular-dialog";
import { NotificationService } from "@progress/kendo-angular-notification";
import { SelectEvent } from "@progress/kendo-angular-upload";
import { ApiService } from "src/app/shared/api.service";
import { MessageService } from "src/app/shared/message.service";
@Component({
    selector: "window-info",
    templateUrl: './windowHistory.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class WindowHistoryComponent implements OnInit {
    @Input() public dataSource: any;
    @Input() public formGroup !: FormGroup;
    @Input() public status: String | undefined;

    public showToolBar = true;
    public listOrderDetail: Array<any> = [];
    public listStatus: Array<any> = [];
    public isCancel = false;
    public isRefund = false;

    constructor(public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
        private notificationService: NotificationService, private message: MessageService, private formBuilder: FormBuilder, public api: ApiService) { }

    public OrderDetail: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
    public statusShipping: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
    ngOnInit(): void {
        this.OrderDetail.Controller = "OrderDetailController";
        this.statusShipping.Controller = "BillController";
        this.OrderDetail.getApi('Customer/' + this.OrderDetail.Controller + '/' + this.formGroup.value.id).subscribe((rs) => {
            this.listOrderDetail = rs;
        }, (error) => {
            if (error.status == 500) {
                let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
                window.location.href = "/login/" + id;
            } else {
                this.api.Notification.notificationError('');
            }
        })
        this.statusShipping.getApi(('api/bill/shiping/' + this.formGroup.value.id)).subscribe((rs) => {
            this.listStatus = rs.data;
        }, (error) => {
            if (error.status == 500) {
                let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
                window.location.href = "/login/" + id;
            } else {
                this.api.Notification.notificationError('');
            }
        })
        if(this.formGroup.value.status == "KHACH_DA_NHAN_HANG" || this.formGroup.value.status == "HUY" || 
        this.formGroup.value.status == "DA_XAC_NHAN_VA_DONG_GOI"){
            this.showToolBar = false;
        }
        this.formGroup.controls.payment.disable({ emitEvent: true });
        this.changeButton();
    }
    getDate(getDate: any) {
        let value = new Date(getDate);
        return value;
    }
    changeButton(): void {
        if (this.formGroup.value.status == "HUY") {
            this.isCancel = false;
        } else {
            this.isCancel = true;
        }
        if(this.formGroup.value.status == "DA_GIAO_BEN_VAN_CHUYEN" || this.formGroup.value.status == "HOAN_HANG"){
            this.showToolBar = false;
        }
        if (this.formGroup.value.status == "KHACH_DA_NHAN_HANG") {
            this.isRefund = true;
        }
    }

    cancel(): void {
        this.api.loading = true;
        this.api.getApi('api/bill/cancel/' + this.formGroup.value.id).subscribe((rs) => {
            if (rs.status) {
                this.message.SendDataAfterUpdate(rs.data);
            }
            this.api.loading = false;
        }, (error) => {
            if (error.status == 500) {
                let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
                window.location.href = "/login/" + id;
            } else {
                this.api.Notification.notificationError(error.error.message);
            }
            this.api.loading = false;
        })
    }
    refund(): void {

    }
}