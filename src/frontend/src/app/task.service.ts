import { Injectable } from '@angular/core';
import { ITask } from './itask.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8080/api/v1"

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private http: HttpClient) { }

    getTasks(): Observable<ITask[]> {
        return this.http.get<ITask[]>(`${BASE_URL}/tasks`);
    }

    addTask(task: ITask) {
        return this.http.post(`${BASE_URL}/tasks`, { ...task, project: null, id: null });
    }

    updateTask(newTask: ITask) {
        return this.http.put(`${BASE_URL}/tasks/${newTask.id}`, { ...newTask, project: null });
    }

    deleteTask(id: number) {
        return this.http.delete(`${BASE_URL}/tasks/${id}`);
    }
}
