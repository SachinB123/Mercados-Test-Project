import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map, concatMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    /* we can write any api url since it is going to be intercepted by angular in memory web api service 
    based on endpoint defined here 'tasks' which is same as returned by InMemoryDbService in fake-backend.service.ts*/
    base_url: string = "http://mybackend.com/api/";
    tasks_endpoint = "tasks";

    constructor(private http: HttpClient) {
    }

    private handleError(error: any) {
        console.log(error);
        return throwError(error);
    }

    //Gets all tasks
    getTasks() {
        return this.http
            .get(this.base_url + this.tasks_endpoint)
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            );
    } //getTasks

    //Creates a task
    createTask(task) {
        return this.http
            .post(this.base_url + this.tasks_endpoint, task)
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            );
    } //createTask

    //Updates a Task
    updateTask(update) {
        return this.http
            .put(this.base_url + this.tasks_endpoint, update)
            .pipe(
            //     concatMap(
            //     () => this.http.post('commands/resetDb', { clear: true })
            // ),
                tap(data => console.log(data)),
                catchError(this.handleError)
            );
    } //updateTask

    //Deletes a Task
    deleteTask(taskId) {
        return this.http
            .delete(`${this.base_url + this.tasks_endpoint}/${taskId}`)
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            )
    } //deleteTask

    //reset Db 
    resetDatabase() {
        return this.http.post('commands/resetDb', { clear: true }) // special command on angular in memory web api
            .pipe(
                tap(data => console.log(data)),
                catchError(this.handleError)
            );
    }

}
