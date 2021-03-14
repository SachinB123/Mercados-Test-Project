import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { MyServiceService } from "./my-service.service";

export class FakeBackendService implements InMemoryDbService {
    backendDataStore = [];
    private _hostName;
    private _serverBaseUrl;

    constructor() {
        this._hostName = window.location.hostname;
        if (this._hostName === 'localhost' || this._hostName === '127.0.0.1') {
            this._serverBaseUrl = 'http://localhost:3000';
        } else {
            this._serverBaseUrl = 'window.location.origin';
        }
    }

    createDb(): {} | Observable<{}> | Promise<{}> {
        let tasks;
        // return new Promise(
            return fetch(this._serverBaseUrl + '/.netlify/functions/server/api/getcsvdata')
        //   )
          .then((result: any) => {
              
            console.log('result in result :: ', result);
            return result.json();
          })
          .then(
            result => {
                console.log('tasks in result :: ', result);
              tasks = result['data'].map((elem, indx) => {
                  elem['id'] = indx+1;
                  return elem;
              });
              return { tasks: tasks };
            }
          );
        // console.log('this.backendDataStore :: ', this.backendDataStore);
        // if (this.backendDataStore && this.backendDataStore.length > 0) {
        //     tasks = this.backendDataStore;
        // } else {
        //     tasks = [
        //         {
        //             id: 1,
        //             description: "Buy Groceries"
        //         },
        //         {
        //             id: 2,
        //             description: "Paint the garage"
        //         }
        //     ];
        // }

        // return {
        //     tasks: tasks
        // };
    }

    setBackendStore(data) {
        this.backendDataStore = data;
    }
}