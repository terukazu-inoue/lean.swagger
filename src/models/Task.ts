
export interface ITask {
  id: number,
  title: string,
  is_done?: boolean
}

export default class Task implements ITask {
  id!: number;
  title!: string;
  is_done?: boolean;
}