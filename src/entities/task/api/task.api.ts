import { TaskRepository } from '@entities/task/lib/storage/Task.repository';
import type { CreateTaskDto, ITask, SearchFilterType, UpdateTaskDto } from '@entities/task/model/task.types';
import { baseApi } from '@shared/api/baseApi';
import { localQuery } from '@shared/api/localQuery';

export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTaskById: build.query<ITask, string>({
      queryFn: (id) => localQuery(() => TaskRepository.getById(id)),
      providesTags: (_res, _err, id) => [{ type: 'Task', id }],
    }),
    getTasks: build.query<ITask[], void>({
      queryFn: () => localQuery(() => TaskRepository.getAll()),
      providesTags: (res) =>
        res
          ? [...res.map(({ id }) => ({ type: 'Task' as const, id })), { type: 'Task', id: 'LIST' }]
          : [{ type: 'Task', id: 'LIST' }],
    }),

    getFilteredTasks: build.query<ITask[], { type: SearchFilterType; value: string }>({
      queryFn: ({ type, value }) => localQuery(() => TaskRepository.filter(value, type)),
      providesTags: (res) =>
        res
          ? [...res.map(({ id }) => ({ type: 'Task' as const, id })), { type: 'Task', id: 'LIST' }]
          : [{ type: 'Task', id: 'LIST' }],
    }),

    createTask: build.mutation<ITask, CreateTaskDto>({
      queryFn: (dto) => localQuery(() => TaskRepository.create(dto)),
      invalidatesTags: ['Task'],
    }),

    updateTask: build.mutation<ITask, { id: string; dto: UpdateTaskDto }>({
      queryFn: ({ id, dto }) => localQuery(() => TaskRepository.update(id, dto)),
      invalidatesTags: ['Task'],
    }),

    deleteTask: build.mutation<ITask, string>({
      queryFn: (id) => localQuery(() => TaskRepository.delete(id)),
      invalidatesTags: ['Task'],
    }),

    startTask: build.mutation<ITask, string>({
      queryFn: (id) => localQuery(() => TaskRepository.startTask(id)),
      invalidatesTags: (res, err, id) => [
        { type: 'Task', id },
        { type: 'Task', id: 'LIST' },
      ],
    }),

    stopTask: build.mutation<ITask, string>({
      queryFn: (id) => localQuery(() => TaskRepository.stopTask(id)),
      invalidatesTags: ['Task'],
    }),

    completeTask: build.mutation<ITask, string>({
      queryFn: (id) => localQuery(() => TaskRepository.complete(id)),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useStartTaskMutation,
  useStopTaskMutation,
  useCompleteTaskMutation,
  useGetFilteredTasksQuery,
  useGetTaskByIdQuery,
} = taskApi;
