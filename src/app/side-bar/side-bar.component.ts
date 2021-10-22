import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  title: string = "Dashboard";
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showAllocations() {
    this.router.navigate(['/allocation']);
  }

  showItems() {
    this.router.navigate(['/items']);
  }

  showProjects() {
    this.router.navigate(['/projects']);
  }

  showUsers() {
    this.router.navigate(['/users']);
  }

}
