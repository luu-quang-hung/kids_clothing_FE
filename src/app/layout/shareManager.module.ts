import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { DialogModule, WindowModule } from "@progress/kendo-angular-dialog";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { GridModule, PagerModule } from "@progress/kendo-angular-grid";
import { IconsModule } from "@progress/kendo-angular-icons";
import { IndicatorsModule } from "@progress/kendo-angular-indicators";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { LabelModule } from "@progress/kendo-angular-label";
import { LayoutModule, PanelBarService } from "@progress/kendo-angular-layout";
import { ListViewModule } from "@progress/kendo-angular-listview";
import { MenusModule } from "@progress/kendo-angular-menu";
import { NavigationModule } from "@progress/kendo-angular-navigation";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { PopupModule } from "@progress/kendo-angular-popup";
import { ScrollViewModule } from "@progress/kendo-angular-scrollview";
import { ToolBarModule } from "@progress/kendo-angular-toolbar";
import { CarouselModule } from "ngx-owl-carousel-o";
import { DefaultManagerModule } from "./default-manager/default-manager.module";

@NgModule({
    declarations:[
        
    ],
    imports: [
        NgbModule,
        NotificationModule,
        DropDownsModule,
        DialogModule,
        WindowModule,
        GridModule,
        ListViewModule,
        IndicatorsModule,
        FontAwesomeModule,
        ScrollViewModule,
        ReactiveFormsModule,
        FormsModule,
        LabelModule,
        InputsModule,
        BrowserModule,
        BrowserAnimationsModule,
        IconsModule,
        ButtonsModule,
        PopupModule,
        MenusModule,
        PagerModule,
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        LayoutModule,
        CarouselModule,
        NavigationModule,
        ToolBarModule,

    ],
    exports:[
        
    ],
    providers: [
        PanelBarService
    ]
})
export class shareManagerModule{}