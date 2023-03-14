import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ApiService } from 'src/app/shared/api.service';
import { SignUpRequestModel } from './create_account.model';
import { CustomerRequestModel } from './create_customer.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild("appendTo", { read: ViewContainerRef })
  public appendTo: ViewContainerRef | undefined;
  public formValue !: FormGroup;
  public loaderVisible = false;
  public AccountObject: SignUpRequestModel = new SignUpRequestModel();
  public CustomerObject: CustomerRequestModel = new CustomerRequestModel();
  public SignupCustomerRequest = {
    signupRequest: {},
    customerRequest: {},
  };
  constructor(private formBuilder: FormBuilder,private notificationService: NotificationService,private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = new FormGroup({
      fullname: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      username: new FormControl(null,Validators.required),
      phone: new FormControl(null,[Validators.required,Validators.maxLength(10)]),
      password: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      confirm_password: new FormControl(null,Validators.required)
    });
  }
  register(): void{
    this.loaderVisible = true;
    this.CustomerObject.fullname = this.formValue.value.fullname;
    this.AccountObject.email = this.formValue.value.email;
    this.AccountObject.username = this.formValue.value.username;
    this.AccountObject.phone = this.formValue.value.phone;
    this.AccountObject.password = this.formValue.value.password;
    if(this.formValue.value.password != this.formValue.value.confirm_password){
      this.loaderVisible = false;
      this.notificationService.show({
        appendTo: this.appendTo,
        content: "Mật khẩu xác nhận khác vs mật khẩu đăng ký",
        animation: { type: "fade", duration: 500 },
        position: { horizontal: "right", vertical: "top" },
        type: { style: "error", icon: true },
      });
    }else{
      this.SignupCustomerRequest.signupRequest = this.AccountObject;
      this.SignupCustomerRequest.customerRequest = this.CustomerObject;
      this.api.postApi('api/auth/signup/customer',this.SignupCustomerRequest).subscribe((res)=>{
        this.notificationService.show({
          appendTo: this.appendTo,
          content: "Đã đăng ký thành công",
          animation: { type: "fade", duration: 500 },
          position: { horizontal: "right", vertical: "top" },
          type: { style: "success", icon: true },
        });
        this.loaderVisible = false;
      }, (error) => {
        if(error.status == 500){
          let id =  encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g,"%27").replace(/"/g,"%22")
          window.location.href = "/login/" +  id;
        }else{
          this.api.Notification.notificationError('');
        }
      })
    }
  }
}
