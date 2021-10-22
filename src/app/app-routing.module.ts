import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllocationComponent } from './allocation/allocation.component';
import { ItemsComponent } from './items/items.component';
import { ProjectsComponent } from './projects/projects.component';
import { UsersComponent } from './users/users.component';
import { AddItemComponent } from './add-item/add-item.component';
import { AddAllocationComponent } from './add-allocation/add-allocation.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { path: "allocation", component: AllocationComponent },
  { path: "items", component: ItemsComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "users", component: UsersComponent },
  { path: "add-item", component: AddItemComponent },
  { path: "add-allocation", component: AddAllocationComponent },
  { path: "add-project", component: AddProjectComponent },
  { path: "add-user", component: AddUserComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
