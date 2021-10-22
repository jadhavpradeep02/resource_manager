import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AllocationService } from '../services/allocation.service';
import { Router } from '@angular/router';

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

  constructor(private allocationService: AllocationService, private fb: FormBuilder, private router: Router) { }

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

  openAllocation() {
    this.router.navigate(['/add-allocation']);
  }

  export() {
  }
}
