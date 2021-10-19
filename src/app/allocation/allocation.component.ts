import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllocationService } from '../services/allocation.service';

export class Allocation {
  constructor(
    public allocated_to: string,
    public item: string,
    public item_description: string,
    public project: string,
    public allocation_date: string,
    public po_no: string,
    public po_amount: string,
    public start_date: string,
    public end_date: string,
  ) { }
}

@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.scss']
})
export class AllocationComponent implements OnInit {
  @Output() allocationsdata = new EventEmitter<Allocation>();
  allocationData: any;
  allocationForm!: FormGroup;
  public obj: any = {};
  title: string = "All Allocations";

  constructor(private allocationService: AllocationService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.allocationService.getAllocationData().subscribe(data => {
      this.allocationData = data;
      console.log("this.allocationData", this.allocationData);
    });

    this.allocationForm = this.fb.group({
      allocated_to: ["", [Validators.required]],
      item: ["", [Validators.required]],
      item_description: ["", [Validators.required]],
      project: ["", [Validators.required]],
      allocation_date: ["", [Validators.required]],
      po_no: ["", [Validators.required]],
      po_amount: ["", [Validators.required]],
      start_date: ["", [Validators.required]],
      end_date: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.obj = { ...this.allocationForm.value, ...this.obj };
    this.allocationForm.value;
    console.log(
      "LOG: AllocationComponent -> onSubmit -> this.allocationForm.value",
      this.allocationForm.value
    );

    if (this.allocationForm.valid) {
      this.allocationsdata.emit(
        new Allocation(
          this.allocationForm.value.allocated_to,
          this.allocationForm.value.item,
          this.allocationForm.value.item_description,
          this.allocationForm.value.project,
          this.allocationForm.value.allocation_date,
          this.allocationForm.value.po_no,
          this.allocationForm.value.po_amount,
          this.allocationForm.value.start_date,
          this.allocationForm.value.end_date
        )
      );
    }
  }

  openAllocation(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  addAllocation(){
    console.log("addItem")
    if (this.allocationForm.valid) {
      let item = {
        "allocation_id": parseInt(this.allocationData[this.allocationData.length - 1].allocation_id) + 1,
        "allocated_to": this.allocationForm.value.allocated_to,
        "item": this.allocationForm.value.item,
        "item_description": this.allocationForm.value.item_description,
        "project": this.allocationForm.value.project,
        "allocation_date": this.allocationForm.value.allocation_date,
        "po_no": this.allocationForm.value.po_no,
        "po_amount": this.allocationForm.value.po_amount,
        "start_date": this.allocationForm.value.start_date,
        "end_date": this.allocationForm.value.end_date
      }
      this.allocationData = [...this.allocationData, item];
      console.log(this.allocationData);
    }
  }

  export() {
  }
}
