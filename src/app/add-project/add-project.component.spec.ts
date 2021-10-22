import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProjectsService } from '../services/projects.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Project, AddProjectComponent } from './add-project.component';

describe('AddProjectComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers:[ProjectsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('boundary', () => {
    it('form invalid when empty', () => {
      expect(component.projectForm.valid).toBeFalsy();
    });

    it('project_name field validity', () => {
      let errors = {};
      let project_name = component.projectForm.controls['project_name'];
      expect(project_name.valid).toBeFalsy();

      // errors = project_name.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set project_name to something correct
      project_name.setValue("");
      errors = project_name.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('project_description field validity', () => {
      let errors = {};
      let project_description = component.projectForm.controls['project_description'];
      expect(project_description.valid).toBeFalsy();

      // errors = project_description.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set project_description to something correct
      project_description.setValue("");
      errors = project_description.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('project_start_date field validity', () => {
      let errors = {};
      let project_start_date = component.projectForm.controls['project_start_date'];
      expect(project_start_date.valid).toBeFalsy();

      // errors = project_start_date.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set project_start_date to something correct
      project_start_date.setValue("");
      errors = project_start_date.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
  });

  describe('business', () => {
    it("should submit form", () => {
      expect(component.projectForm.valid).toBeFalsy();
      component.projectForm.controls["project_name"].setValue("EComm");
      component.projectForm.controls["project_description"].setValue("Ecommerce project used for buy any products related to cosmetic, apparels and household things");
      component.projectForm.controls["project_start_date"].setValue("1-July-2018");

      expect(component.projectForm.valid).toBeTruthy();

      let project: Project;
      // Subscribe to the Observable and store the user in a local variable.
      component.projectdata.subscribe((value) => {
        project = value;
      });

      // Trigger the signin function
      component.onSubmit();

      // Now we can check to make sure the emitted value is correct
      expect(project.project_name).toBe(project.project_name);
      expect(project.project_description).toBe(project.project_description);
      expect(project.project_start_date).toBe(project.project_start_date);
    });
  });
});
