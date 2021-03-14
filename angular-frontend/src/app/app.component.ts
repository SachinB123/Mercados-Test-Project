import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from './services/app.service';
import { FakeBackendService } from './services/fake-backend.service';
import { MyServiceService } from './services/my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'angular-frontend';
  tasks: any[] = [];
  myTask: string;
  taskEdit: string;
  editMode: boolean = false;
  loading: boolean = false;
  
  currentPaginationPage = 1; // current page in display out of total pages

  constructor(private myService: MyServiceService, private appservice: AppService,
    private fakeDbService: FakeBackendService) { }

  ngOnInit() {
    // this.myService.getBackendData().subscribe((res) => {
    //   console.log('res :: ', res);
    //   this.fakeDbService.setBackendStore(res['data']);
    // }, (err) => {
    //   console.log("err :: ", err);
    // });

    this.getAllTasks(); // fake api call
  }

  getAllTasks(resetDb?: boolean) {
    if (resetDb) {
      this.appservice.getTasks().subscribe((data: any) => {
        this.tasks = data;
        const postData = {
          updatedData: this.tasks
        }
        this.myService.updateBackendData(postData).subscribe((res: any) => {

          this.appservice.resetDatabase().subscribe((data: any) => {
    
            this.appservice.getTasks().subscribe((data: any) => {
              this.tasks = data;
            });
          });
        })
      });
    } else {
      this.appservice.getTasks().subscribe((data: any) => {
        this.tasks = data;
      });
    }
  } //getAllTasks

  create() {
    this.loading = true;
    const postData = {
      description: this.myTask
    };

    this.appservice.createTask(postData).subscribe(data => {
      this.loading = false;
      this.getAllTasks();
      this.myTask = "";
    });
  } //create

  edit(task) {
    this.taskEdit = Object.assign({}, task);
    task.editing = true;
    this.editMode = true;
  } //edit

  saveEdit(task) {
    console.log('task arr after saving :: ', JSON.stringify(this.tasks[0]));
    this.appservice.updateTask(this.taskEdit).subscribe(data => {
      //task = data;
      this.getAllTasks(true);
      task.editing = false;
      this.editMode = false;
    });
  } //saveEdit

  delete(task) {
    console.log("Delete");
    this.appservice.deleteTask(task.id).subscribe(data => {
      this.getAllTasks();
    });
  } //delete

  pageChanged(e) { // our paginated keyword table
    this.currentPaginationPage = e;
  }
}

