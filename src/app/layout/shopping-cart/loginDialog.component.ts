import { Component, Input, ViewChild, ViewContainerRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogService } from "@progress/kendo-angular-dialog";
import { NotificationService } from "@progress/kendo-angular-notification";
import { ApiService } from "src/app/shared/api.service";
import { MessageService } from "src/app/shared/message.service";
@Component({
    selector: "dialog-login",
    template: `
        <h3 style="font-weight: 600;border-bottom: 2px solid #ddd;padding: 15px 0px;margin: 3px 0px;">
            Vui lòng đăng nhập trước khi thanh toán
        </h3>
        <div>
            <form [formGroup]="userForm" style="margin: 15px 0px;">
                <div class="row" style="padding: 5px 0px;">
                    <label class="col-md-4 form-label">Tên đăng nhập: </label>
                    <div class="col-md-8">
                        <input type="text" kendoTextBox placeholder="Tên đăng nhập hoặc email" style="width: 100%"
                        formControlName="email" name="email"/>
                    </div>
                </div>
                <div class="row" style="padding: 5px 0px;">
                    <label class="col-md-4 form-label">Mật khẩu: </label>
                    <div class="col-md-8">
                        <input type="password" kendoTextBox placeholder="Mật khẩu" style="width: 100%" 
                        formControlName="password" name="password"/>
                    </div>
                </div>
                <div style="margin: 15px 0px;" class="row">
                    <div class="col-md-4" style="padding: 0px;">
                        <button type="submit" kendoButton iconClass="fa fa-sign-in fa-fw" (click)="login()"
                            style="color: #fff !important;background-color: #ffc045 !important;border-color: #ffc045 !important;">
                            Đăng nhập
                        </button>
                    </div>
                    <div class="col-md-4" style="text-align: center;">
                        <a href="">Đăng ký tài khoản ?</a>
                    </div>
                    <div class="col-md-4" style="text-align: center;">
                        <a href="">Quên mật khẩu ?</a>
                    </div>
                </div>
            </form>
        </div>
    `,
    styleUrls: ['./shopping-cart.component.css']
})
export class DialogLoginComponent {
    @ViewChild("appendTo", { read: ViewContainerRef })
    public appendTo: ViewContainerRef | undefined;
    @Input() public dialog: any;
    public userForm: FormGroup = new FormGroup({
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required),
    });
    public accountModel = {
        username: '',
        password: ''
    };
    constructor(private api: ApiService, public notificationService: NotificationService, private messgae: MessageService,
        private dialogService: DialogService) { }
    login(): void {
        this.accountModel.username = this.userForm.value.email;
        this.accountModel.password = this.userForm.value.password;
        this.api.postApi('api/auth/login', this.accountModel).subscribe((res) => {
            if (res.status == true) {
                sessionStorage.setItem('Account', res.data.id);
                sessionStorage.setItem('USERNAME', res.data.username);
                sessionStorage.setItem('TOKEN', res.data.token);
                sessionStorage.setItem('USER_ID', res.data.id);
                sessionStorage.setItem('ROLE', res.data.roles[0]);
                this.dialog.close();
                this.messgae.SendTokenAccount(res.status);
            } else {
                if (res.message == "Mật khẩu sai") {
                    this.notificationService.show({
                        appendTo: this.appendTo,
                        content: res.message,
                        animation: { type: "fade", duration: 500 },
                        position: { horizontal: "right", vertical: "top" },
                        type: { style: "error", icon: true },
                    });
                }
                else {
                    this.notificationService.show({
                        appendTo: this.appendTo,
                        content: res.message,
                        animation: { type: "fade", duration: 500 },
                        position: { horizontal: "right", vertical: "top" },
                        type: { style: "warning", icon: true },
                    });
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
}