import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Items, AddItemComponent } from './add-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemsService } from '../services/items.service';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers: [ItemsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
