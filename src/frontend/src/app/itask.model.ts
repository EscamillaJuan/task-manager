export interface ITask {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    dueDate: Date;
    project: number;
}
