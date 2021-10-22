import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  @Output() itemsdata = new EventEmitter<Items>();
  itemsForm!: FormGroup;
  itemData: any;
  public obj: any = {};

  constructor(private router: Router, private fb: FormBuilder, private itemsService: ItemsService) { }

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

  cancel() {
    this.router.navigate(['/items']);
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
      this.router.navigate(['/items']);
    }
  }

  onSubmit() {
    this.obj = { ...this.itemsForm.value, ...this.obj };
    console.log("LOG: ItemsComponent -> onSubmit -> this.itemsForm.value", this.itemsForm.value);

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
}
