import Task, { ITask } from './Task';

export interface ITaskOne {
  task: Task
}

export interface ITaskList {
  tasks: Task[]
}

export interface IPageInfo {
  total: number,
  offset: number
}

export interface ITaskListResponse extends ITaskList, IPageInfo {}

export interface IParameters {
  offset?: number,
  limit?: number
}

const DATASTORE: (Task | undefined)[] = [];

export default class TaskController {
  constructor () {
  }

  static all(query: IParameters): Promise<ITaskListResponse> {
    return new Promise(async (resolve, reject) => {
      let bSuccess = false;
      do{
        if(DATASTORE.length == 0) break;
        const offset = query.offset ?? 0;
        const limit = query.limit ?? DATASTORE.length;
        if(offset >= DATASTORE.length) break;
        const tasks = DATASTORE.slice(offset)
        .filter(x => x !== undefined)
        .slice(0, limit);
        resolve({
          tasks: tasks as Task[],
          total: tasks.length,
          offset: query.offset || 0
        });
        bSuccess = true;
      } while(false);
      if(!bSuccess){
        reject({
          code: 404,
          message: '指定IDのタスクが見つかりませんでした'
        });
      }
    });
  }

  static get(id: number): Promise<ITaskOne> {
    return new Promise(async (resolve, reject) => {
      let bSuccess = false;
      do{
        if(DATASTORE.length == 0) break;
        if(id >= DATASTORE.length) break;
        const data = DATASTORE[id];
        if(!data) break;
        resolve({ task: data });
        bSuccess = true;
      } while(false);
      if(!bSuccess){
        reject({
          code: 404,
          message: '指定IDのタスクが見つかりませんでした'
        });
      }
    });
  }

  static add(param: ITask): Promise<ITaskOne> {
    return new Promise(async (resolve, reject) => {
      const id = DATASTORE.length;
      const result: Task = {
        id: id,
        title: param.title,
        is_done: param.is_done ?? false
      };
      DATASTORE.push(result);
      resolve({ task: result });
    });
  }

  static update(id: number, param: ITask): Promise<ITaskOne> {
    return new Promise(async (resolve, reject) => {
      let bSuccess = false;
      do{
        if(DATASTORE.length == 0) break;
        if(id >= DATASTORE.length) break;
        let org = DATASTORE[id];
        if(!org) break;
        org.title = param.title;
        if(param.is_done) org.is_done = param.is_done;
        resolve({ task: org });
        bSuccess = true;
      } while(false);
      if(!bSuccess){
        reject({
          code: 404,
          message: '指定IDのタスクが見つかりませんでした'
        });
      }
    });
  }

  static delete(id: number): Promise<ITaskOne> {
    return new Promise(async (resolve, reject) => {
      let bSuccess = false;
      do{
        if(DATASTORE.length == 0) break;
        if(id >= DATASTORE.length) break;
        const data = DATASTORE[id];
        if(!data) break;
        DATASTORE[id] = undefined;
        resolve({ task: data });
        bSuccess = true;
      } while(false);
      if(!bSuccess){
        reject({
          code: 404,
          message: '指定IDのタスクが見つかりませんでした'
        });
      }
    });
  }
}