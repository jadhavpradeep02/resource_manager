import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AllocationService } from '../services/allocation.service';
import { Allocation, AddAllocationComponent } from './add-allocation.component';

describe('AddAllocationComponent', () => {
  let component: AddAllocationComponent;
  let fixture: ComponentFixture<AddAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAllocationComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, FormsModule, HttpClientTestingModule],
      providers:[AllocationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('boundary', () => {

    it('form invalid when empty', () => {
      expect(component.allocationForm.valid).toBeFalsy();
    });

    it('item_name field validity', () => {
      let errors = {};
      let allocated_to = component.allocationForm.controls['allocated_to'];
      expect(allocated_to.valid).toBeFalsy();

      // errors = allocated_to.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set allocated_to to something correct
      allocated_to.setValue("");
      errors = allocated_to.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('item field validity', () => {
      let errors = {};
      let item = component.allocationForm.controls['item'];
      expect(item.valid).toBeFalsy();

      // errors = item.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set item to something correct
      item.setValue("");
      errors = item.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('item_description field validity', () => {
      let errors = {};
      let item_description = component.allocationForm.controls['item_description'];
      expect(item_description.valid).toBeFalsy();

      // errors = item_description.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set item_description to something correct
      item_description.setValue("");
      errors = item_description.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('project field validity', () => {
      let errors = {};
      let project = component.allocationForm.controls['project'];
      expect(project.valid).toBeFalsy();

      // errors = project.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set project to something correct
      project.setValue("");
      errors = project.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('allocation_date field validity', () => {
      let errors = {};
      let allocation_date = component.allocationForm.controls['allocation_date'];
      expect(allocation_date.valid).toBeFalsy();

      // errors = allocation_date.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set allocation_date to something correct
      allocation_date.setValue("");
      errors = allocation_date.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('po_no field validity', () => {
      let errors = {};
      let po_no = component.allocationForm.controls['po_no'];
      expect(po_no.valid).toBeFalsy();

      // errors = po_no.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set po_no to something correct
      po_no.setValue("");
      errors = po_no.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('po_amount field validity', () => {
      let errors = {};
      let po_amount = component.allocationForm.controls['po_amount'];
      expect(po_amount.valid).toBeFalsy();

      // errors = po_amount.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set po_amount to something correct
      po_amount.setValue("");
      errors = po_amount.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('start_date field validity', () => {
      let errors = {};
      let start_date = component.allocationForm.controls['start_date'];
      expect(start_date.valid).toBeFalsy();

      // errors = start_date.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set start_date to something correct
      start_date.setValue("");
      errors = start_date.errors || {};
      expect(errors["required"]).toBeTruthy();
    });

    it('end_date field validity', () => {
      let errors = {};
      let end_date = component.allocationForm.controls['end_date'];
      expect(end_date.valid).toBeFalsy();

      // errors = end_date.errors || {};
      // expect(errors["required"]).toBeTruthy();

      // Set end_date to something correct
      end_date.setValue("");
      errors = end_date.errors || {};
      expect(errors["required"]).toBeTruthy();
    });
  });

  describe('business', () => {
    it("should submit form", () => {
      expect(component.allocationForm.valid).toBeFalsy();
      component.allocationForm.controls["allocated_to"].setValue("Ashok Kumar");
      component.allocationForm.controls["item"].setValue("Mobile - Samsung");
      component.allocationForm.controls["item_description"].setValue("4 GB RAM, Smart");
      component.allocationForm.controls["project"].setValue("EComm");
      component.allocationForm.controls["allocation_date"].setValue("3-October-2019");
      component.allocationForm.controls["po_no"].setValue("8927299");
      component.allocationForm.controls["po_amount"].setValue("345");
      component.allocationForm.controls["start_date"].setValue("3-October-2019");
      component.allocationForm.controls["end_date"].setValue("3-October-2021");

      expect(component.allocationForm.valid).toBeTruthy();

      let allocation: Allocation;
      // Subscribe to the Observable and store the user in a local variable.
      component.allocationsdata.subscribe((value) => {
        allocation = value;
      });

      // Trigger the signin function
      component.onSubmit();

      // Now we can check to make sure the emitted value is correct
      expect(allocation.allocated_to).toEqual(allocation.allocated_to);
      expect(allocation.item).toEqual(allocation.item);
      expect(allocation.item_description).toEqual(allocation.item_description);
      expect(allocation.project).toEqual(allocation.project);
      expect(allocation.allocation_date).toEqual(allocation.allocation_date);
      expect(allocation.po_no).toEqual(allocation.po_no);
      expect(allocation.po_amount).toEqual(allocation.po_amount);
      expect(allocation.start_date).toEqual(allocation.start_date);
      expect(allocation.end_date).toEqual(allocation.end_date);
    });
  });
});
