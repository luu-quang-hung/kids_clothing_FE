import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { QuanityModel } from "src/app/component/product-details/quantity.model";
import { ApiService } from "src/app/shared/api.service";
import { MessageService } from "src/app/shared/message.service";
@Component({
    selector: "window-info",
    template: `
      <div class="row">
            <div class="col-md-5">
                <img src="{{infoProduct.Product.image}}" width="100%" height="350px">
            </div>
            <div class="col-md-7">
                <h3 style="border-bottom: 2px solid #dee2e6;margin: 0px;padding-bottom: 15px;font-size: 25px;font-weight: 600;">
                    {{infoProduct.Product.name}}
                </h3>
                <p style="color: #ffc045;padding-top: 10px;font-size: 20px;font-weight: 600;">
                    {{infoProduct.Product.price}} VND
                </p>
                <div class="row" style="margin: 15px 0px;padding-top: 5px;">
                    <span class="col-md-3 col-sm-2" style="padding: 0px">Màu sắc</span>
                    <form [formGroup]="formGroup" class="row col-md-9">
                        <div *ngFor="let color of listProperty" class="col-md-4 col-sm-2">
                            <input type="radio" name="property" value="{{color.idproperty}}" #{{color.idproperty}}
                                formControlName="property" kendoRadioButton (change)="changeProperty(color)" />&nbsp;
                            <label class="k-label" [for]="color.name">{{color.name}}</label>
                        </div>
                    </form>
                </div>
                <form [formGroup]="formGroup" style="margin: 20px 0px;">
                    <div class="row">
                        <label class="col-md-3 k-label">Chọn size</label>
                        <div class="col-md-9">
                            <kendo-dropdownlist [data]="listSize" textField="name" valueField="id" formControlName="size"
                                name="size" (valueChange)="changeSize($event)" [defaultItem]="defaultItem"
                                [filterable]="true">
                            </kendo-dropdownlist>
                        </div>
                    </div>
                </form>
                <div class="row">
                    <label class="col-md-3 k-label">Số lượng</label>
                    <div class="col-md-9">
                        <kendo-numerictextbox format="0" [min]="1" [max]="100" (valueChange)="changeQuantity($event)"
                        [value]="infoProduct.Quantity" formControlName="quantity" name="quantity">
                        </kendo-numerictextbox>
                    </div>
                </div>
                <button kendoButton iconClass="fa fa-bookmark-o" (click)="changeShoppingCard($event)"
                    style="background: #ffc045;color: white;font-size: 20px;margin: 20px 0px;">
                    Lưu thông tin đã sửa
                </button>
            </div>
      </div>
    `,
    styleUrls: ['./shopping-cart.component.css']
})
export class DialogInfoProductComponent implements OnInit {
    @Input() public infoProduct: any;
    @Input() public listSize: Array<any> = [];
    @Input() public listProperty: Array<any> = [];
    @Input() public quantity: any;
    @Input() public dialog: any;
    public QuantityObj: QuanityModel = new QuanityModel();
    public str: string | undefined;
    public defaultItem: any = {
        name: "Choose...",
        id: null,
    };
    constructor(private message: MessageService,private api: ApiService) { }
    @Input() public formGroup = new FormGroup({
        property: new FormControl(),
        size: new FormControl(),
        quantity: new FormControl()
    });
    ngOnInit(): void {
        this.QuantityObj.Size = this.infoProduct.Size;
        this.QuantityObj.Property = this.infoProduct.Property;
        this.QuantityObj.Quantity = this.infoProduct.Quantity
    }
    changeProperty(e: any): void {
        let property = this.listProperty.filter((x: any) => x.idproperty == e.idproperty)
        this.QuantityObj.Property = property[0];
    }
    changeSize(value: any): void {
        this.QuantityObj.Size = value;
    }
    changeQuantity(value: any): void {
        this.QuantityObj.Quantity = value;
    }
    changeShoppingCard(value: any): void {
        if(this.QuantityObj.Quantity <= 0){
            return this.api.Notification.notificationWarning('Số lượng phải lớn hơn 0')
        }
        let data = JSON.parse(String(localStorage.getItem(this.infoProduct.Id)));
        data.Quantity = this.QuantityObj.Quantity;
        data.Size = this.QuantityObj.Size;
        data.Property = this.QuantityObj.Property;
        localStorage.setItem(this.infoProduct.Id, JSON.stringify(data));
        this.message.SendStorageCart(data);
    }
}