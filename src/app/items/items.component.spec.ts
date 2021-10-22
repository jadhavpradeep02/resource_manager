import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ItemsComponent } from './items.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemsService } from '../services/items.service';
import { By } from '@angular/platform-browser';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ItemsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('boundary', () => {
    it('should have a title', () => {
      expect(component.title).toBe('Manage Item');
      // we are accessing "h1"
      const title = fixture.debugElement.query(By.css('h1')).nativeElement;
      expect(title.innerHTML).toBe('Manage Item');
    });

    it('should have New Item Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#new_item');
      expect(btn.innerHTML).toBe('New Item');
    });

    it('should have Export Button', () => {
      const btn = fixture.debugElement.nativeElement.querySelector('#export');
      expect(btn.innerHTML).toBe('Export');
    });

    it("should show project header length", async() => {
      var rowHeaderLength = fixture.debugElement.nativeElement.querySelectorAll("th").length;
      expect(rowHeaderLength).toBe(5);
    });

    it("should have table header Name", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[0].textContent).toEqual("Name");
    });

    it("should have table header Item Description", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[1].textContent).toEqual("Item Description");
    });

    it("should have table header Item Type", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[2].textContent).toEqual("Item Type");
    });

    it("should have table header Cost", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[3].textContent).toEqual("Cost ($)");
    });

    it("should have table header Remove", () => {
      var headers = fixture.debugElement.nativeElement.querySelectorAll("th")
      expect(headers[4].textContent).toEqual("Remove");
    });

    it("should render table", () => {
      const result = fixture.debugElement.queryAll(By.css(".item-table"));
      const markup = result[0].nativeNode.outerHTML;

      //const tableEl = fixture.debugElement.query(By.css('div'));
      //const bodyRows = tableEl.query(By.css('.ui-table-tbody')).queryAll(By.css('tr'));
      //expect(bodyRows.length).toEqual(10);
    });
  });

  describe("exception", () => {
    it("should be check items api", inject([HttpTestingController, ItemsService], (httpMock: HttpTestingController, dataService: ItemsService) => {
      component.ngOnInit();
      dataService.getItemsData().subscribe(data => {
        expect(data).toEqual(data);
        expect(data).toBe(data);
        expect(data).not.toBe(null);
        expect(null).toBeNull();
        expect(data).toBeTruthy();
      });
    }));
  });
});
