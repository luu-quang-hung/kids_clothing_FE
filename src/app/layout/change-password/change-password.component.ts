import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { rssBoxIcon } from '@progress/kendo-svg-icons';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild("appendTo", { read: ViewContainerRef })
  public appendTo: ViewContainerRef | undefined;
  public current = 0;
  public stepType = 'full';
  public step_1: boolean = true;
  public step_2: boolean = true;
  public step_3: boolean = true;
  public loaderVisible = false;
  public formValue!: FormGroup;
  public steps = [
    { label: "First step", isValid: true },
    { label: "Second step", isValid: true, disabled: true },
  ];
  constructor(private api: ApiService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.step_2 = false;
    this.step_3 = false;
    this.formValue = new FormGroup({
      email: new FormControl(null, Validators.required),
      otp: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }
  prevNext(e: any): void {
    this.loaderVisible = true;
    this.api.postApi("api/forgotpassword", this.formValue.value).subscribe((res) => {
      if (res.status) {
        if (this.current < this.steps.length - 1) {
          this.current += 1;
        }
        this.step_1 = false;
        this.step_2 = true;
        this.loaderVisible = false;
      } else {
        this.loaderVisible = false;
        this.notificationService.show({
          appendTo: this.appendTo,
          content: "Không tồn tại tài khoản này",
          animation: { type: "fade", duration: 500 },
          position: { horizontal: "right", vertical: "top" },
          type: { style: "warning", icon: true },
        });
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
  changePassword(): void {
    this.api.postApi("api/forgotpassword/change", this.formValue.value).subscribe((res) => {
      if (res.status) {
        this.notificationService.show({
          appendTo: this.appendTo,
          content: "Đổi mật khẩu thành công",
          animation: { type: "fade", duration: 500 },
          position: { horizontal: "right", vertical: "top" },
          type: { style: "success", icon: true },
        });
      } else {
        this.notificationService.show({
          appendTo: this.appendTo,
          content: res.message,
          animation: { type: "fade", duration: 500 },
          position: { horizontal: "right", vertical: "top" },
          type: { style: "warning", icon: true },
        });
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
