import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

export class User {
  constructor(
    public employee_name: string,
    public employee_email: string,
    public employee_mobile: string,
    public employee_project: string,
    public employee_birth_date: string,
    public employee_added_date: string
  ) { }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Output() userdata = new EventEmitter<User>();
  usersData: any;
  userForm!: FormGroup;
  public obj: any = {};
  title = "Manage Employee";

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsersData().subscribe(data => {
      this.usersData = data;
      console.log("this.usersData", this.usersData);
    });

    this.userForm = this.fb.group({
      employee_name: ["", [Validators.required]],
      employee_email: ["", [Validators.required]],
      employee_mobile: ["", [Validators.required]],
      employee_project: ["", [Validators.required]],
      employee_birth_date: ["", [Validators.required]],
      employee_added_date: ["", [Validators.required]]
    });
  }

  onSubmit() {
    this.obj = { ...this.userForm.value, ...this.obj };
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.userForm.value",
      this.userForm.value
    );

    if (this.userForm.valid) {
      this.userdata.emit(
        new User(
          this.userForm.value.employee_name,
          this.userForm.value.employee_email,
          this.userForm.value.employee_mobile,
          this.userForm.value.employee_project,
          this.userForm.value.employee_birth_date,
          this.userForm.value.employee_added_date,
        )
      );
    }
  }

  openUser() {
    //this.modalService.open(content, { size: 'lg' });
    this.router.navigate(['/add-user']);
  }

  export() {
  }

  deleterow(id) {
    this.usersData = this.usersData.filter(user => user.employee_id != id);
  }

  addUser(){
    console.log("addProduct")
    if (this.userForm.valid) {
      let project = {
        "employee_id": parseInt(this.usersData[this.usersData.length - 1].employee_id) + 1,
        "employee_name": this.userForm.value.employee_name,
        "employee_email": this.userForm.value.employee_email,
        "employee_mobile": this.userForm.value.employee_mobile,
        "employee_project": this.userForm.value.employee_project,
        "employee_birth_date": this.userForm.value.employee_birth_date,
        "employee_added_date": this.userForm.value.employee_added_date
      }
      this.usersData = [...this.usersData, project];
      console.log(this.usersData);
    }
  }

}
