import { BaseModel } from "./BaseModel";


export interface ITodoModel extends BaseModel {
    text: string;
    completed?: boolean;
}