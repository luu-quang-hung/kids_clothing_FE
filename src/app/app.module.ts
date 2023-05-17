import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import '@angular/localize/init';
import { ReactiveFormsModule } from '@angular/forms';
import '@angular/compiler';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './routing/app-routing.module';
import { DefaultModule } from './layout/default/default.module';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IconsModule } from '@progress/kendo-angular-icons';
import { PagerModule } from '@progress/kendo-angular-pager';
import { MenuModule } from '@progress/kendo-angular-menu';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClienRoutingModule } from './routing/client-routing.module';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { ManagerRoutingModule } from './routing/manager-routing.module';
import { DefaultManagerModule } from './layout/default-manager/default-manager.module';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { EditorModule } from '@progress/kendo-angular-editor';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
// import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    GridModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    IconsModule,
    PagerModule,
    MenuModule,
    ScrollViewModule,
    ListViewModule,
    InputsModule,
    CarouselModule,
    IndicatorsModule,
    DialogsModule,
    NotificationModule,
    NgbModule,
    NavigationModule,
    UploadsModule,
    EditorModule,
    ToolBarModule,
    DateInputsModule,
    ChartsModule,
    /////////////////////Share layout Default Module/////////
    DefaultModule,
    DefaultManagerModule,
    /////////////////////Module Routing/////////////////////
    AppRoutingModule,
    ClienRoutingModule,
    ManagerRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
