import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LayoutModule, PanelBarService } from "@progress/kendo-angular-layout";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { PagerModule } from "@progress/kendo-angular-pager";
import { PopupModule } from "@progress/kendo-angular-popup";
import { MenusModule } from "@progress/kendo-angular-menu";
import { IconsModule } from "@progress/kendo-angular-icons";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LabelModule } from "@progress/kendo-angular-label";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { ScrollViewModule } from "@progress/kendo-angular-scrollview";
import { HomePageComponent } from './home-page/home-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { IndicatorsModule } from "@progress/kendo-angular-indicators";
import { GridModule } from "@progress/kendo-angular-grid";
import { ListViewModule } from "@progress/kendo-angular-listview";
import { WindowModule } from "@progress/kendo-angular-dialog";
import { DialogModule } from "@progress/kendo-angular-dialog";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { DialogInfoProductComponent } from "./shopping-cart/infoProductDialog.component";
import { DialogLoginComponent } from "./shopping-cart/loginDialog.component";
import { NotificationModule } from "@progress/kendo-angular-notification";
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NavigationModule } from "@progress/kendo-angular-navigation";
import { ToolBarModule } from "@progress/kendo-angular-toolbar";
import { HistoryAndWalletComponent } from "./history-and-wallet/history-and-wallet.component";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { WindowHistoryComponent } from "./history-and-wallet/windowHistory.component";
import { WindowRechargeComponent } from "./history-and-wallet/windowRecharge.component";
import { IntroduceComponent } from "../component/introduce/introduce.component";
import { ContactComponent } from "../component/contact/contact.component";
import { LoginAdminComponent } from "../layout/loginAdmin/login.component";

@NgModule({
    declarations:[
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        HomePageComponent,
        LoginComponent,
        LoginAdminComponent,
        ShoppingCartComponent,
        RegisterComponent,
        ChangePasswordComponent,
        HistoryAndWalletComponent,
        IntroduceComponent,
        ContactComponent,
        ///Các popup window /////////
        DialogInfoProductComponent,
        DialogLoginComponent,
        WindowHistoryComponent,
        WindowRechargeComponent
    ],
    imports:[
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
        DateInputsModule,
    ],
    entryComponents: [
        DialogInfoProductComponent,
        DialogLoginComponent,
        WindowHistoryComponent,
        WindowRechargeComponent
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        HomePageComponent,
    ],
    providers: [
        PanelBarService
    ]
})
export class shareModule{}
