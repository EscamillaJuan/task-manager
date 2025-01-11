import { Component } from '@angular/core';
import { ITask } from '../../itask.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css'
})
export class TaskListComponent {
    tasks: ITask[] = [
        {
            id: 1,
            name: "Design wireframe",
            description: "",
            completed: false,
            dueDate: new Date(2025, 0, 12),
            project: 1,
        },
        {
            id: 2,
            name: "Develope backend",
            description: "",
            completed: true,
            dueDate: new Date(2025, 0, 12),
            project: 1,
        },
        {
            id: 3,
            name: "Connect server and client",
            description: "",
            completed: false,
            dueDate: new Date(2025, 0, 12),
            project: 1,
        }
    ]

    handleCheckbox(id: number) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
    }
}
