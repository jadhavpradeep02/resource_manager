import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

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
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @Output() userdata = new EventEmitter<User>();
  usersData: any;
  userForm!: FormGroup;
  public obj: any = {};

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      employee_name: ["", [Validators.required]],
      employee_email: ["", [Validators.required]],
      employee_mobile: ["", [Validators.required]],
      employee_project: ["", [Validators.required]],
      employee_birth_date: ["", [Validators.required]],
      employee_added_date: ["", [Validators.required]]
    });

    this.userService.getUsersData().subscribe(data => {
      this.usersData = data;
      console.log("this.usersData", this.usersData);
    });
  }

  cancel() {
    this.router.navigate(['/users']);
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
          this.userForm.value.employee_added_date
        )
      );
    }
  }

  addUser(){
    console.log("addUser")
    if (this.userForm.valid) {
      let user = {
        "employee_id": parseInt(this.usersData[this.usersData.length - 1].employee_id) + 1,
        "employee_name": this.userForm.value.employee_name,
        "employee_email": this.userForm.value.employee_email,
        "employee_mobile": this.userForm.value.employee_mobile,
        "employee_project": this.userForm.value.employee_project,
        "employee_birth_date": this.userForm.value.employee_birth_date,
        "employee_added_date": this.userForm.value.employee_added_date
      }
      this.usersData = [...this.usersData, user];
      console.log(this.usersData);
      this.router.navigate(['/users']);
    }
  }

}
