import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { EventManager } from "@angular/platform-browser";
import { DialogService, WindowService } from "@progress/kendo-angular-dialog";
import { NotificationService } from "@progress/kendo-angular-notification";
import { SelectEvent } from "@progress/kendo-angular-upload";
import { ApiService } from "src/app/shared/api.service";
import { MessageService } from "src/app/shared/message.service";
@Component({
    selector: "window-info",
    templateUrl: './windowCustomer.component.html',
})
export class WindowCustomerComponent implements OnInit {
    @Input() public dataSource: any;
    @Input() public formGroup !: FormGroup;
    @Input() public status: String | undefined;
    @Input() public Base: any;

    public formAccount = new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.required]),
        role: new FormControl('', Validators.required)
    })
    //, Validators.minLength(10), Validators.maxLength(10)
    public listRole = [
        {
            id: 'admin',
            name: 'Nhân viên'
        },
        {
            id: 'staff',
            name: 'Admin'
        },
    ]
    constructor(public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
        private notificationService: NotificationService, private message: MessageService, private formBuilder: FormBuilder, public api: ApiService) { }

    ngOnInit(): void {
        if (this.status == "EDIT") {
            this.formAccount.controls.email.setValue(this.formGroup.value.email);
            this.formAccount.controls.username.setValue(this.formGroup.value.username);
            this.formAccount.controls.password.setValue(this.formGroup.value.password);
            this.formAccount.controls.phone.setValue(this.formGroup.value.phone);
            this.formAccount.controls.role.setValue(this.formGroup.value.role);
        }
    }
    changeRole(event: any): void{
        let arr = [];
        this.formAccount.value.role = arr.push(event.id);
    }
    Rules(): boolean {
        if (this.formAccount.value.email == "" || this.formAccount.value.email == null) {
            this.api.Notification.notificationWarning('Không được để trống email');
            return false;
        }
        if (this.formAccount.controls.email.hasError('email')) {
            this.api.Notification.notificationWarning('Sai định dạng email');
            return false;
        }
        if (this.formAccount.value.username < 0 || this.formAccount.value.username == null) {
            this.api.Notification.notificationWarning('Không được để trống username');
            return false;
        }
        if (this.formAccount.value.password == "" || this.formAccount.value.password == null) {
            this.api.Notification.notificationWarning('Không được để trống mật khẩu');
            return false;
        }
        if (this.formAccount.controls.phone.hasError('required')) {
            this.api.Notification.notificationWarning('Không được để trống sdt');
            return false;
        }
        // if (this.formAccount.controls.sdt.hasError('minlength') || this.formAccount.controls.sdt.hasError('maxlength')) {
        //     this.api.Notification.notificationWarning('Độ dài phải là 10 kí tự');
        //     return false;
        // }
        return true;
    }
    saveHandler(event: any): void {
        let arr = [];
        arr.push(this.formGroup.value.role.name);
        this.formAccount.value.role = arr;
        this.api.loading = true;
        this.Base.loading = true;
        if (!this.Rules()) { 
            this.api.loading = false;
            return; 
        }
        this.api.postApi('api/auth/signup/admin', this.formAccount.value).subscribe((rs) => {
            if (rs.status) {
                this.message.SendDataAfterUpdate(rs.data);
                this.api.Notification.notificationExecute(rs);
                this.Base.loading = false;
                this.api.loading = false;
                this.Base.windowRef.close();
            }
        }, (error) => {
            if (error.status == 500) {
                let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
                window.location.href = "/login/" + id;
            } else {
                this.api.Notification.notificationError('');
            }
            this.api.loading = false;
            this.Base.loading = false;
        })
    }

}