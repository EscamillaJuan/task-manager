import { Component, inject } from '@angular/core';
import { ITask } from '../../itask.model';
import { DatePipe } from '@angular/common';
import { TaskService } from '../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

const emptyTask = {
    id: 0,
    name: "",
    description: "",
    completed: false,
    dueDate: new Date(),
    project: 0,
}
@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [DatePipe, TaskFormComponent, AsyncPipe],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css'
})


export class TaskListComponent {
    tasks: ITask[] = [];
    showModal = false;
    selectedTask: ITask = emptyTask;
    formType: "CREATE" | "UPDATE" = "CREATE";
    tasks$!: Observable<ITask[]>;

    private taskService = inject(TaskService);

    constructor() {
        this.updateTasks();
    }

    updateTasks() {
        this.tasks$ = this.taskService.getTasks();
        this.taskService.getTasks().subscribe(tasks => {
            this.tasks = tasks
        });
    }

    handleCheckbox(id: number) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        const updatedTask = this.tasks[taskIndex];
        updatedTask.completed = !updatedTask.completed;
        this.taskService.updateTask(updatedTask).subscribe(() => {
            this.updateTasks();
        });
    }

    deleteTask(id: number) {
        this.taskService.deleteTask(id).subscribe(() => {
            this.updateTasks();
        });
    }

    updateTask(task: ITask) {
        this.selectedTask = task;
        this.formType = "UPDATE";
        this.showModal = true;
    }

    addNewTask(task: ITask) {
        this.selectedTask = emptyTask;
        this.formType = "CREATE";
        this.showModal = true;
    }

    handleModalClose(type: "SUBMIT" | "CANCEL") {
        if (type === "SUBMIT") {
            this.updateTasks();
        }
        this.showModal = false;

    }
}
