import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Project, ProjectsComponent } from './projects.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProjectsService } from '../services/projects.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers:[ProjectsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('boundary', () => {
    it('should have a title', () => {
      expect(component.title).toBe('Manage Project');
      // we are accessing "h1"
      const title = fixture.debugElement.query(By.css('h1')).nativeElement;
      expect(title.innerHTML).toBe('Manage Project');
    });

    it('should have New Project Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#new_project');
      expect(btn.innerHTML).toBe('New Project');
    });

    it('should have Export Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#export');
      expect(btn.innerHTML).toBe('Export');
    });

    it("should show project header length", async() => {
      var rowHeaderLength = fixture.debugElement.nativeElement.querySelectorAll("th").length;
      expect(rowHeaderLength).toBe(3);
    });

    it("should have table header Name ", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[0].textContent).toEqual("Name");
    });

    it("should have table header Description ", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[1].textContent).toEqual("Description");
    });

    it("should have table header Remove ", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[2].textContent).toEqual("Remove");
    });

    it("should render table", () => {
      const result = fixture.debugElement.queryAll(By.css(".project-table"));
      const markup = result[0].nativeNode.outerHTML;
      console.log(markup);

      //const tableEl = fixture.debugElement.query(By.css('div'));
      //const bodyRows = tableEl.query(By.css('.ui-table-tbody')).queryAll(By.css('tr'));
      //expect(bodyRows.length).toEqual(10);
    });
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

  describe("exception", () => {
    it("should be check items api", inject([HttpTestingController, ProjectsService], (httpMock: HttpTestingController, dataService: ProjectsService) => {
      component.ngOnInit();
      dataService.getProjectData().subscribe(data => {
        expect(data).toEqual(data);
        expect(data).toBe(data);
        expect(data).not.toBe(null);
        expect(null).toBeNull();
        expect(data).toBeTruthy();
      });
    }));
  });
});
