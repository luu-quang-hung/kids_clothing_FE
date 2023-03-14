import { CommonModule } from "@angular/common";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { DialogModule, WindowModule } from "@progress/kendo-angular-dialog";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { EditorModule } from "@progress/kendo-angular-editor";
import { GridModule, PagerModule } from "@progress/kendo-angular-grid";
import { IconsModule } from "@progress/kendo-angular-icons";
import { IndicatorsModule } from "@progress/kendo-angular-indicators";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { LayoutModule } from "@progress/kendo-angular-layout";
import { ListViewModule } from "@progress/kendo-angular-listview";
import { MenusModule } from "@progress/kendo-angular-menu";
import { NavigationModule } from "@progress/kendo-angular-navigation";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { PopupModule } from "@progress/kendo-angular-popup";
import { ScrollViewModule } from "@progress/kendo-angular-scrollview";
import { ToolBarModule } from "@progress/kendo-angular-toolbar";
import { UploadsModule } from "@progress/kendo-angular-upload";
import { CarouselModule } from "ngx-owl-carousel-o";
import { DashboardComponent } from "src/app/component/dashboard/dashboard.component";
import { ManagerAccountComponent } from "src/app/component/manager-account/manager-account.component";
import { WindowAccountComponent } from "src/app/component/manager-account/windowAccount.component";
import { ManagerBillComponent } from "src/app/component/manager-bill/manager-bill.component";
import { WindowBillComponent } from "src/app/component/manager-bill/windowBill.component";
import { ManagerCategoryComponent } from "src/app/component/manager-category/manager-category.component";
import { ManagerEventComponent } from "src/app/component/manager-event/manager-event.component";
import { ManagerProductComponent } from "src/app/component/manager-product/manager-product.component";
import { WindowProductComponent } from "src/app/component/manager-product/windowProduct.component";
import { WindowUploadComponent } from "src/app/component/manager-product/windowUpload.component";
import { ManagerPropertyComponent } from "src/app/component/manager-property/manager-property.component";
import { ManagerQuantityComponent } from "src/app/component/manager-quantity/manager-quantity.component";
import { WindowQuantityComponent } from "src/app/component/manager-quantity/windowQuantity.component";
import { ManagerSizeComponent } from "src/app/component/manager-size/manager-size.component";
import { ManagerVoucherComponent } from "src/app/component/manager-voucher/manager-voucher.component";
import { SwiperModule } from "swiper/angular";
import { shareManagerModule } from "../shareManager.module";
import { DefaultManagerComponent } from "./default-manager.component";

@NgModule({
    declarations: [
        DefaultManagerComponent,
        ManagerProductComponent,
        DashboardComponent,
        ManagerSizeComponent,
        ManagerCategoryComponent,
        ManagerQuantityComponent,
        ManagerPropertyComponent,
        ManagerAccountComponent,
        ManagerVoucherComponent,
        ManagerBillComponent,
        ManagerEventComponent,
        ///////Popup của component cha//////
        WindowProductComponent,
        WindowQuantityComponent,
        WindowBillComponent,
        WindowUploadComponent,
        WindowAccountComponent,
    ],
    imports:[
        NgbModule,
        GridModule,
        DialogModule,
        WindowModule,
        IndicatorsModule,
        NotificationModule,
        ScrollViewModule,
        MenusModule,
        PagerModule,
        FormsModule,
        IconsModule,
        LayoutModule,
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        ListViewModule,
        InputsModule,
        ButtonsModule,
        DropDownsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SwiperModule,
        BrowserAnimationsModule,
        EditorModule,
        ToolBarModule,
        UploadsModule,
        DateInputsModule,
        ChartsModule,
        //Routing module
        shareManagerModule
    ],
    entryComponents: [
        WindowProductComponent,
        WindowQuantityComponent,
        WindowBillComponent,
        WindowUploadComponent,
        WindowAccountComponent
    ],
    bootstrap: [DefaultManagerComponent]
})
export class DefaultManagerModule{}