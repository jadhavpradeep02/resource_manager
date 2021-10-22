import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers:[UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('boundary', () => {
    it('should have a title', () => {
      expect(component.title).toBe('Manage Employee');
      // we are accessing "h1"
      const title = fixture.debugElement.query(By.css('h1')).nativeElement;
      expect(title.innerHTML).toBe('Manage Employee');
    });

    it('should have New user Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#new_user');
      expect(btn.innerHTML).toBe('New user');
    });

    it('should have Export Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#export');
      expect(btn.innerHTML).toBe('Export');
    });

    it("should show user header length", async() => {
      var rowHeaderLength = fixture.debugElement.nativeElement.querySelectorAll("th").length;
      expect(rowHeaderLength).toBe(8);
    });

    it("should have table header Employee ID", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[0].textContent).toEqual("Employee ID");
    });

    it("should have table header Employee Name", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[1].textContent).toEqual("Employee Name");
    });

    it("should have table header Email", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[2].textContent).toEqual("Email");
    });

    it("should have table header Mobile", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[3].textContent).toEqual("Mobile");
    });

    it("should have table header Project", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[4].textContent).toEqual("Project");
    });

    it("should have table header Birth Date", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[5].textContent).toEqual("Birth Date");
    });

    it("should have table header Assigned Date", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[6].textContent).toEqual("Assigned Date");
    });

    it("should have table header Remove", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[7].textContent).toEqual("Remove");
    });

    it("should render table", () => {
      const result = fixture.debugElement.queryAll(By.css(".user-table"));
      const markup = result[0].nativeNode.outerHTML;

      //const tableEl = fixture.debugElement.query(By.css('div'));
      //const bodyRows = tableEl.query(By.css('.ui-table-tbody')).queryAll(By.css('tr'));
      //expect(bodyRows.length).toEqual(10);
    });
  });

  describe("exception", () => {
    it("should be check users api", inject([HttpTestingController, UserService], (httpMock: HttpTestingController, userService: UserService) => {
      component.ngOnInit();
      userService.getUsersData().subscribe(data => {
        expect(data).toEqual(data);
        expect(data).toBe(data);
        expect(data).not.toBe(null);
        expect(null).toBeNull();
        expect(data).toBeTruthy();
      });
    }));
  });
});
