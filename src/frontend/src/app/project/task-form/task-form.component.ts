import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { ITask } from '../../itask.model';
import { TaskService } from '../services/task.service'

@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './task-form.component.html',
    styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
    @Input() currentTask: ITask | null = null;
    @Input() formType: 'UPDATE' | 'CREATE' = 'CREATE';
    @Output() closePanel = new EventEmitter<'SUBMIT' | 'CANCEL'>();
    taskForm: FormGroup;

    private taskService = inject(TaskService);

    constructor(private fb: FormBuilder) {
        this.taskForm = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            dueDate: ['', Validators.required],
            id: [null],
            project: [0],
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentTask'] && changes['currentTask'].currentValue) {
            const task = changes['currentTask'].currentValue as ITask;

            const dueDateFormatted = task.dueDate
                ? new Date(task.dueDate).toISOString().split('T')[0]
                : '';

            this.taskForm.patchValue({
                ...task,
                dueDate: dueDateFormatted,
            });
        }
    }

    handleSubmit() {
        if (this.taskForm.valid) {
            const newTask: ITask = {
                ...this.taskForm.value,
                dueDate: new Date(this.taskForm.value.dueDate),
                completed:
                    this.formType === 'UPDATE' ? this.taskForm.value.completed : false,
            };

            if (this.formType === 'CREATE') {
                this.taskService.addTask(newTask).subscribe(() => {
                    this.closePanel.emit('SUBMIT');
                });
            } else {
                this.taskService.updateTask(newTask).subscribe(() => {
                    this.closePanel.emit('SUBMIT');
                });
            }
        }
    }

    handleCancel() {
        this.closePanel.emit('CANCEL');
    }
}