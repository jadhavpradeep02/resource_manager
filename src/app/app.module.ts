import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllocationComponent } from './allocation/allocation.component';
import { ItemsComponent } from './items/items.component';
import { ProjectsComponent } from './projects/projects.component';
import { SideBarComponent } from './side-bar/side-bar.component';

import { AllocationService } from './services/allocation.service';
import { ProjectsService } from './services/projects.service';
import { ItemsService } from './services/items.service';
import { UserService } from './services/user.service';
import { AddItemComponent } from './add-item/add-item.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddAllocationComponent } from './add-allocation/add-allocation.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    AllocationComponent,
    ItemsComponent,
    ProjectsComponent,
    SideBarComponent,
    AddItemComponent,
    AddProjectComponent,
    AddAllocationComponent,
    AddUserComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [AllocationService, ProjectsService, ItemsService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
