import { ITask } from "./itask.model";

export interface IProject {
    id: number;
    name: string;
    description: string;
    tasks: ITask[];
}
