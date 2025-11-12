import Error from 'next/error';

import { v4 as uuid } from 'uuid';

import type { CreateTaskDto, ITask, SearchFilterType, UpdateTaskDto } from '@entities/task/model/task.types';
import { TaskStatus } from '@entities/task/model/task.types';
import { time } from '@shared/lib/utils/formatTime';

const STORAGE_KEY = 'tasks-db';

export class TaskRepository {
  private static read(): ITask[] {
    if (typeof window === 'undefined') return [];

    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }

  private static write(data: ITask[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  private static updateStatus(task: ITask): ITask {
    if (task.spentTime >= +task.estimatedTime) {
      task.status = TaskStatus.OVERDUE;
    }

    return task;
  }

  private static msToSeconds = (ms: number) => Math.floor(ms / 1000);

  private static stopActiveTasks(tasks: ITask[]): ITask[] {
    const now = Date.now();

    return tasks.map((t) => {
      if (t.status === TaskStatus.IN_PROGRESS && t.startedAt) {
        const deltaMs = now - t.startedAt;
        const deltaSeconds = this.msToSeconds(deltaMs);
        const updated: ITask = {
          ...t,
          status: TaskStatus.PENDING,
          spentTime: t.spentTime + deltaSeconds,
          startedAt: undefined,
        };
        return this.updateStatus(updated);
      }
      return t;
    });
  }

  static getAll(): ITask[] {
    return this.read();
  }

  static create(dto: CreateTaskDto): ITask {
    const newTask: ITask = {
      id: uuid(),
      name: dto.name,
      description: dto.description,
      estimatedTime: time.toSeconds(dto.estimatedTime + ''),
      spentTime: 0,
      createdAt: Date.now(),
      status: TaskStatus.PENDING,
    };

    const tasks = this.read();
    tasks.push(newTask);
    this.write(tasks);
    return newTask;
  }

  static update(id: string, dto: UpdateTaskDto): ITask {
    let tasks = this.read();
    tasks = this.stopActiveTasks(tasks);

    tasks = tasks.map((t) =>
      t.id === id
        ? {
            ...t,
            ...dto,
            estimatedTime: dto.estimatedTime ? time.toSeconds(dto.estimatedTime + '') : t.estimatedTime,
          }
        : t
    );

    this.write(tasks);
    return tasks.find((t) => t.id === id)!;
  }

  static stopTask(id: string): ITask {
    const now = Date.now();
    let updatedTask: ITask | undefined;

    let tasks = this.read();

    tasks = tasks.map((t) => {
      if (t.id === id && t.status === TaskStatus.IN_PROGRESS && t.startedAt) {
        const deltaMs = now - t.startedAt;
        const deltaSeconds = this.msToSeconds(deltaMs);

        const updated: ITask = {
          ...t,
          status: TaskStatus.PENDING,
          spentTime: t.spentTime + deltaSeconds,
          startedAt: undefined,
        };

        updatedTask = this.updateStatus(updated);
        return updatedTask;
      }
      return t;
    });

    this.write(tasks);

    if (!updatedTask) {
      throw new Error({ title: 'not found', statusCode: 404 });
    }

    return updatedTask;
  }

  static delete(id: string) {
    const tasks = this.read().filter((t) => t.id !== id);

    this.write(tasks);

    return {} as ITask;
  }

  static startTask(id: string): ITask {
    let tasks = this.read();

    tasks = this.stopActiveTasks(tasks);

    tasks = [...tasks.map((t) => (t.id === id ? { ...t, status: TaskStatus.IN_PROGRESS, startedAt: Date.now() } : t))];

    this.write(tasks);

    return tasks.find((t) => t.id === id)!;
  }

  static complete(id: string): ITask {
    const tasks = this.read();

    const updated = tasks.map((t) => (t.id === id ? { ...t, status: TaskStatus.COMPLETED, startedAt: undefined } : t));

    this.write(updated);

    return updated.find((t) => t.id === id)!;
  }

  static filter(value: string, type: SearchFilterType): ITask[] {
    const tasks = this.read();
    const query = value.toLowerCase().trim();
    if (!query) return tasks;

    return tasks.filter((task) => {
      const field = task[type];
      if (typeof field === 'string') {
        return field.toLowerCase().includes(query);
      }
      return false;
    });
  }
}
