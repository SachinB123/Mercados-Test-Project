import { Component, OnInit } from '@angular/core';
import { MyServiceService } from './services/my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-frontend';

  constructor(private myService: MyServiceService) {}

  ngOnInit() {
    this.myService.getBackendData().subscribe((res) => {
      console.log('res :: ', res);
    }, (err)=>{
      console.log("err :: ", err);
    })
  }
}
