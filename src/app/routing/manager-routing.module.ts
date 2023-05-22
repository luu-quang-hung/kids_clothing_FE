import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../component/dashboard/dashboard.component";
import { ManagerAccountComponent } from "../component/manager-account/manager-account.component";
import { ManagerCustomerComponent } from "../component/manager-customer/manager-customer.component";
import { ManagerBillComponent } from "../component/manager-bill/manager-bill.component";
import { ManagerCategoryComponent } from "../component/manager-category/manager-category.component";
import { ManagerEventComponent } from "../component/manager-event/manager-event.component";
import { ManagerProductComponent } from "../component/manager-product/manager-product.component";
import { ManagerPropertyComponent } from "../component/manager-property/manager-property.component";
import { ManagerQuantityComponent } from "../component/manager-quantity/manager-quantity.component";
import { ManagerSizeComponent } from "../component/manager-size/manager-size.component";
import { ManagerVoucherComponent } from "../component/manager-voucher/manager-voucher.component";
import { PageNotFoundComponent } from "../component/page-not-found/page-not-found.component";
import { DefaultManagerComponent } from "../layout/default-manager/default-manager.component";
import { AuthGuard } from "../shared/auth.guard";

const routes: Routes = [
    {
        path: 'manager',
        component: DefaultManagerComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }                    
            },
            {
                path: 'quan-ly-san-pham',
                component: ManagerProductComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }                    
            },
            {
                path: 'quan-ly-size',
                component: ManagerSizeComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }                    
            },
            {
                path: 'quan-ly-danh-muc-san-pham',
                component: ManagerCategoryComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }                    
            },
            {
                path: 'quan-ly-thuoc-tinh',
                component: ManagerPropertyComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }                    
            },
            {
                path: 'quan-ly-so-luong',
                component: ManagerQuantityComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }                    
            },
            {
                path: 'quan-ly-tai-khoan',
                component: ManagerAccountComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }                        
            },
            {
                path: 'quan-ly-khach-hang',
                component: ManagerCustomerComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }                        
            },
            {
                path: 'quan-ly-don-hang',
                component: ManagerBillComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }                    
            },
            {
                path: 'quan-ly-event',
                component: ManagerEventComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }                    
            },
            {
                path: 'quan-ly-voucher',
                component: ManagerVoucherComponent,
                canActivate: [AuthGuard],
                data: {
                    expectedRole: 'ROLE_ADMIN'
                }                    
            },
        ]
    },
    {
        path: 'pageNotFound',
        component: PageNotFoundComponent
    }
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class ManagerRoutingModule { }