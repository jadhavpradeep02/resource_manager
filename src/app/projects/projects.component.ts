import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @Output() projectdata = new EventEmitter<Project>();
  projectsData: any;
  projectForm!: FormGroup;
  public obj: any = {};
  title = "Manage Project";

  constructor(private projectService: ProjectsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.projectService.getProjectData().subscribe(data => {
      this.projectsData = data;
      console.log("this.projectsData", this.projectsData);
    });

    this.projectForm = this.fb.group({
      project_name: ["", [Validators.required]],
      project_description: ["", [Validators.required]],
      project_start_date: ["", [Validators.required]]
    });
  }

  onSubmit() {
    this.obj = { ...this.projectForm.value, ...this.obj };
    this.projectForm.value;
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

  openProject() {
  }

  export() {
  }

  deleterow() {
  }
}
