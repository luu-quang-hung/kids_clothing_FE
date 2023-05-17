import { NgModule } from "@angular/core";
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "../component/contact/contact.component";
import { IntroduceComponent } from "../component/introduce/introduce.component";
import { ChangePasswordComponent } from "../layout/change-password/change-password.component";
import { HomePageComponent } from "../layout/home-page/home-page.component";
import { LoginComponent } from "../layout/login/login.component";
import { RegisterComponent } from "../layout/register/register.component";
import { ShoppingCartComponent } from "../layout/shopping-cart/shopping-cart.component";
import { LoginAdminComponent } from "../layout/loginAdmin/login.component";

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path: 'login/:id',
        component: LoginComponent,
        pathMatch: 'full',
    },
    {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full'
    },
    {
        path: 'changePassword',
        component: ChangePasswordComponent,
        pathMatch: 'full'
    },
    {
        path: 'my-cart',
        component: ShoppingCartComponent,
        pathMatch: 'full'
    },
    {
        path: 'contact',
        component: ContactComponent,
        pathMatch: 'full'
    },
    {
        path: 'introduce',
        component: IntroduceComponent,
        pathMatch: 'full'
    },
    {
      path: 'admin/login',
      component: LoginAdminComponent,
      pathMatch: 'full'
  }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
