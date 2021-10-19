import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemsService } from '../services/items.service';

export class Items {
  constructor(
    public item_name: string,
    public item_type: string,
    public item_description: string,
    public item_cost: string
  ) { }
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Output() itemsdata = new EventEmitter<Items>();
  itemData: any;
  itemsForm!: FormGroup;
  public obj: any = {};
  title = "Manage Item";

  constructor(private itemsService: ItemsService, private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.itemsService.getItemsData().subscribe(data => {
      this.itemData = data;
      console.log("this.itemData", this.itemData);
    });

    this.itemsForm = this.fb.group({
      item_name: ["", [Validators.required]],
      item_type: ["", [Validators.required]],
      item_description: ["", [Validators.required]],
      item_cost: ["", [Validators.required]]
    });
  }

  onSubmit() {
    this.obj = { ...this.itemsForm.value, ...this.obj };
    this.itemsForm.value;
    console.log(
      "LOG: ItemsComponent -> onSubmit -> this.itemsForm.value",
      this.itemsForm.value
    );

    if (this.itemsForm.valid) {
      this.itemsdata.emit(
        new Items(
          this.itemsForm.value.item_name,
          this.itemsForm.value.item_type,
          this.itemsForm.value.item_description,
          this.itemsForm.value.item_cost
        )
      );
    }
  }

  openItem(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  export(){
  }

  deleterow(id) {
    this.itemData = this.itemData.filter(item => item.item_id != id);
  }

  addItem(){
    console.log("addItem")
    if (this.itemsForm.valid) {
      let item = {
        "item_id": parseInt(this.itemData[this.itemData.length - 1].item_id) + 1,
        "item_name" : this.itemsForm.value.item_name,
        "item_type" : this.itemsForm.value.item_type,
        "item_description" : this.itemsForm.value.item_description,
        "cost" : this.itemsForm.value.item_cost
      }
      this.itemData = [...this.itemData, item];
      console.log(this.itemData);
    }
  }
}
