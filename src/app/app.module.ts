import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AllocationComponent } from './allocation/allocation.component';
import { ItemsComponent } from './items/items.component';
import { ProjectsComponent } from './projects/projects.component';
import { SideBarComponent } from './side-bar/side-bar.component';

import { AllocationService } from './services/allocation.service';
import { ProjectsService } from './services/projects.service';
import { ItemsService } from './services/items.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllocationComponent,
    ItemsComponent,
    ProjectsComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AllocationService, ProjectsService, ItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
