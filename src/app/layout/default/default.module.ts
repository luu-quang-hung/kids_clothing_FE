import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DefaultComponent } from "./default.component";
import { shareModule } from "../share.module";
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IconsModule } from "@progress/kendo-angular-icons";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PagerModule } from "@progress/kendo-angular-pager";
import { MenusModule } from "@progress/kendo-angular-menu";
import { ScrollViewModule } from "@progress/kendo-angular-scrollview";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { ListViewModule } from "@progress/kendo-angular-listview";
import { ProductDetailsComponent } from "src/app/component/product-details/product-details.component";
import { ListProductComponent } from "src/app/component/list-product/list-product.component";
import { ListProductByCategoryComponent } from "src/app/component/list-product-by-category/list-product-by-category.component";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwiperModule } from "swiper/angular";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { SearchComponent } from "src/app/component/search/search.component";

@NgModule({
    declarations: [
        DefaultComponent,
        ListProductByCategoryComponent,
        ListProductComponent,
        ProductDetailsComponent,
        SearchComponent
    ],
    imports: [
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
        DateInputsModule,
        //Routing module
        shareModule
    ],
    bootstrap: [DefaultComponent]
})
export class DefaultModule { }