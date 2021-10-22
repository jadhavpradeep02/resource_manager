import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../services/projects.service';

export class Project {
  constructor(
    public project_name: string,
    public project_description: string,
    public project_start_date: string
  ) { }
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  @Output() projectdata = new EventEmitter<Project>();
  projectsData: any;
  projectForm!: FormGroup;
  public obj: any = {};

  constructor(private projectService: ProjectsService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      project_name: ["", [Validators.required]],
      project_description: ["", [Validators.required]],
      project_start_date: ["", [Validators.required]]
    });

    this.projectService.getProjectData().subscribe(data => {
      this.projectsData = data;
      console.log("this.projectsData", this.projectsData);
    });
  }

  cancel() {
    this.router.navigate(['/projects']);
  }

  onSubmit() {
    this.obj = { ...this.projectForm.value, ...this.obj };
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.projectForm.value",
      this.projectForm.value
    );

    if (this.projectForm.valid) {
      this.projectdata.emit(
        new Project(
          this.projectForm.value.project_name,
          this.projectForm.value.project_description,
          this.projectForm.value.project_start_date
        )
      );
    }
  }

  addProject(){
    console.log("addProject")
    if (this.projectForm.valid) {
      let project = {
        "project_id": parseInt(this.projectsData[this.projectsData.length - 1].project_id) + 1,
        "project_name": this.projectForm.value.project_name,
        "project_description": this.projectForm.value.project_description,
        "project_start_date": this.projectForm.value.project_start_date
      }
      this.projectsData = [...this.projectsData, project];
      console.log(this.projectsData);
      this.router.navigate(['/projects']);
    }
  }
}
