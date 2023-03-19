import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { EventManager } from "@angular/platform-browser";
import { DialogService, WindowService } from "@progress/kendo-angular-dialog";
import { NotificationService } from "@progress/kendo-angular-notification";
import { SelectEvent } from "@progress/kendo-angular-upload";
import { ApiService } from "src/app/shared/api.service";
import { MessageService } from "src/app/shared/message.service";
@Component({
    selector: "window-info",
    templateUrl: './windowQuantity.component.html',
})
export class WindowQuantityComponent implements OnInit {
    @Input() public dataSource: any;
    @Input() public formGroup !: FormGroup;
    @Input() public status!: any;

    public listTypeSize: Array<any> = [];
    public listProperty: Array<any> = [];
    public listSize: Array<any> = [];
    public listSizeById: Array<any> = [];
    public listProduct: Array<any> = [];
    public selectedValue = 2;
    public defaultItem: { name: string; id: number, typesize: any } = {
        name: "Choose...",
        id: 0,
        typesize: {
            id: 0,
            name: "Choose..."
        }
    };
    public defaultItemProperty: { name: string; id: number } = {
        name: "Choose...",
        id: 0,
    }
    public defaultItemProduct: { name: string; id: number } = {
        name: "Choose...",
        id: 0,
    }

    public disabled = false;

    constructor(private api: ApiService, public http: HttpClient, private windowService: WindowService, private dialogService: DialogService,
        private notificationService: NotificationService, private message: MessageService, private formBuilder: FormBuilder) {
    }
    public Quantity: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
    public TypeSize: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
    public Size: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
    public Property: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
    public Product: ApiService = new ApiService(this.http, this.windowService, this.dialogService, this.notificationService, this.message, this.formBuilder);
    
    ngOnInit(): void {
        this.Quantity.typeData = "popup"
        this.Quantity.isManager = true;
        this.TypeSize.isManager = true;
        this.Size.isManager = true;
        this.Property.isManager = true;
        this.Product.isManager = true;
        this.Quantity.Controller = "QuantityManagerController";
        this.TypeSize.Controller = "TypeSizeManagerController";
        this.Size.Controller = "SizeManagerController";
        this.Property.Controller = "PropertyManagerController";
        this.Product.Controller = "ProductManagerController";
        this.TypeSize.Read.Execute().subscribe((rs) => {
            this.listTypeSize = rs.data;
        }, (error) => {
            if (error.status == 500) {
                let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
                window.location.href = "/login/" + id;
            } else {
                this.Size.Notification.notificationError('');
            }
        })
        this.Size.Read.Execute().subscribe((rs) => {
            this.listSize = rs.data;
            if (this.status == "CREATE") {
                this.disabled = true;
                this.dataSource.size = this.defaultItem;
                this.formGroup.controls.size.setValue(this.defaultItem);
                this.formGroup.controls.property.setValue(this.defaultItemProperty);
            } else {
                this.listSizeById = this.listSize.filter((x) => x.typesize.id == this.formGroup.value.size.typesize.id);
            }
        }, (error) => {
            if (error.status == 500) {
                let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
                window.location.href = "/login/" + id;
            } else {
                this.Size.Notification.notificationError('');
            }
        })
        this.Property.Read.Execute().subscribe((rs) => {
            this.listProperty = rs.data;
        }, (error) => {
            if (error.status == 500) {
                let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
                window.location.href = "/login/" + id;
            } else {
                this.Property.Notification.notificationError('');
            }
        })
        this.Product.Read.Execute().subscribe((rs) => {
            this.listProduct = rs.data;
        }, (error) => {
            if (error.status == 500) {
                let id = encodeURIComponent('Bạn không có quyền vào trang đó').replace(/'/g, "%27").replace(/"/g, "%22")
                window.location.href = "/login/" + id;
            } else {
                this.Product.Notification.notificationError('');
            }
        })
        this.formGroup.addControl('typesize', new FormControl());
        if (this.status == "CREATE") {
            this.disabled = true;
            this.dataSource.size = this.defaultItem;
            this.formGroup.controls.size.setValue(this.defaultItem);
            this.formGroup.controls.property.setValue(this.defaultItemProperty);
        } else {
            this.formGroup.controls.product.setValue([this.formGroup.value.product]);
        }
    }
    
    Rules(): boolean{
        if(this.formGroup.value.product == ""){
            this.api.Notification.notificationWarning('Không được để trống sản phẩm');
            return false;
        }
        if(this.formGroup.value.property == ""){
            this.api.Notification.notificationWarning('Không được để trống màu sắc');
            return false;
        }
        if(this.formGroup.value.quantity == ""){
            this.api.Notification.notificationWarning('Không được để trống số lượng');
            return false;
        }
        if(this.formGroup.value.quantity < 0){
            this.api.Notification.notificationWarning('Số lượng không được nhỏ hơn 0');
            return false;
        }
        if(this.formGroup.value.size.id == 0){
            this.api.Notification.notificationWarning('Mời bạn chọn size');
            return false;
        }
        if(this.formGroup.value.typesize.id == 0){
            this.api.Notification.notificationWarning('Mời bạn chọn loại size');
            return false;
        }
        return true;
    }
    selectProperty(event: any): void {

    }
    selectTypeSize(event: any): void {
        this.disabled = false;
        this.formGroup.value.size = this.defaultItem;
        this.listSizeById = this.listSize.filter((x) => x.typesize.id == event.id);
    }
    saveHandler(event: any): void {
        if(!this.Rules()){return};
        let formData = new FormData();
        let request = {
            product: '',
            property: '',
            quantity: '',
            size: ''
        }
        request.product = this.formGroup.value.product;
        request.property = this.formGroup.value.property;
        request.quantity = this.formGroup.value.quantity;
        request.size = this.formGroup.value.size;
        formData.append('quantityDTO',JSON.stringify(request));
        formData.append('status',this.status);
        this.api.Update.Execute(formData);
    } 
}