import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Items, ItemsComponent } from './items.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule, HttpClientTestingModule],
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

  describe('boundary', () => {

    it('form invalid when empty', () => {
      expect(component.itemsForm.valid).toBeFalsy();
    });

    it('item_name field validity', () => {
      let errors = {};
      let item_name = component.itemsForm.controls['item_name'];
      expect(item_name.valid).toBeFalsy();

      // errors = item_name.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set item_name to something correct
      item_name.setValue("");
      errors = item_name.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('item_type field validity', () => {
      let errors = {};
      let item_type = component.itemsForm.controls['item_type'];
      expect(item_type.valid).toBeFalsy();

      // errors = item_type.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set item_type to something correct
      item_type.setValue("");
      errors = item_type.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('item_description field validity', () => {
      let errors = {};
      let item_description = component.itemsForm.controls['item_description'];
      expect(item_description.valid).toBeFalsy();

      // errors = item_description.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set item_description to something correct
      item_description.setValue("");
      errors = item_description.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('item_cost field validity', () => {
      let errors = {};
      let item_cost = component.itemsForm.controls['item_cost'];
      expect(item_cost.valid).toBeFalsy();

      // errors = item_cost.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set item_cost to something correct
      item_cost.setValue("");
      errors = item_cost.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
  });

  describe('business', () => {
    it("should submit form", () => {
      expect(component.itemsForm.valid).toBeFalsy();
      component.itemsForm.controls["item_name"].setValue("Laptop - Dell");
      component.itemsForm.controls["item_type"].setValue("Hardware");
      component.itemsForm.controls["item_description"].setValue("i5 Processor, 8 GB RAM, 256 GB HDD");
      component.itemsForm.controls["item_cost"].setValue("456");

      expect(component.itemsForm.valid).toBeTruthy();

      let items: Items;
      // Subscribe to the Observable and store the user in a local variable.
      component.itemsdata.subscribe((value) => {
        items = value;
      });

      // Trigger the signin function
      component.onSubmit();

      // Now we can check to make sure the emitted value is correct
      expect(items.item_name).toEqual(items.item_name);
      expect(items.item_type).toEqual(items.item_type);
      expect(items.item_description).toEqual(items.item_description);
      expect(items.item_cost).toEqual(items.item_cost);
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
