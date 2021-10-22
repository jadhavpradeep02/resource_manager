import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../services/user.service';
import { User, AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers:[UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('boundary', () => {

    it('form invalid when empty', () => {
      expect(component.userForm.valid).toBeFalsy();
    });

    it('employee_name field validity', () => {
      let errors = {};
      let employee_name = component.userForm.controls['employee_name'];
      expect(employee_name.valid).toBeFalsy();

      // errors = employee_name.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set employee_name to something correct
      employee_name.setValue("");
      errors = employee_name.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('employee_email field validity', () => {
      let errors = {};
      let employee_email = component.userForm.controls['employee_email'];
      expect(employee_email.valid).toBeFalsy();

      // errors = employee_email.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set employee_email to something correct
      employee_email.setValue("");
      errors = employee_email.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('employee_mobile field validity', () => {
      let errors = {};
      let employee_mobile = component.userForm.controls['employee_mobile'];
      expect(employee_mobile.valid).toBeFalsy();

      // errors = employee_mobile.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set employee_mobile to something correct
      employee_mobile.setValue("");
      errors = employee_mobile.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('employee_project field validity', () => {
      let errors = {};
      let employee_project = component.userForm.controls['employee_project'];
      expect(employee_project.valid).toBeFalsy();

      // errors = employee_project.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set employee_project to something correct
      employee_project.setValue("");
      errors = employee_project.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('employee_birth_date field validity', () => {
      let errors = {};
      let employee_birth_date = component.userForm.controls['employee_birth_date'];
      expect(employee_birth_date.valid).toBeFalsy();

      // errors = employee_birth_date.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set employee_birth_date to something correct
      employee_birth_date.setValue("");
      errors = employee_birth_date.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('employee_added_date field validity', () => {
      let errors = {};
      let employee_added_date = component.userForm.controls['employee_added_date'];
      expect(employee_added_date.valid).toBeFalsy();

      // errors = employee_added_date.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set employee_added_date to something correct
      employee_added_date.setValue("");
      errors = employee_added_date.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
  });

  describe('business', () => {
    it("should submit form", () => {
      expect(component.userForm.valid).toBeFalsy();
      component.userForm.controls["employee_name"].setValue("Ashok Kumar");
      component.userForm.controls["employee_email"].setValue("ashok.kumar@gmail.com");
      component.userForm.controls["employee_mobile"].setValue("9867153742");
      component.userForm.controls["employee_project"].setValue("McDonalds");
      component.userForm.controls["employee_birth_date"].setValue("3-October-1995");
      component.userForm.controls["employee_added_date"].setValue("23-September-2019");

      expect(component.userForm.valid).toBeTruthy();

      let user: User;
      // Subscribe to the Observable and store the user in a local variable.
      component.userdata.subscribe((value) => {
        user = value;
      });

      // Trigger the signin function
      component.onSubmit();

      // Now we can check to make sure the emitted value is correct
      expect(user.employee_name).toEqual(user.employee_name);
      expect(user.employee_email).toEqual(user.employee_email);
      expect(user.employee_mobile).toEqual(user.employee_mobile);
      expect(user.employee_project).toEqual(user.employee_project);
      expect(user.employee_birth_date).toEqual(user.employee_birth_date);
      expect(user.employee_added_date).toEqual(user.employee_added_date);
    });
  });
});
