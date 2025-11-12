import { TaskRepository } from '@entities/task/lib/storage/Task.repository';
import type { CreateTaskDto, ITask, SearchFilterType, UpdateTaskDto } from '@entities/task/model/task.types';
import { baseApi } from '@shared/api/baseApi';
import { localQuery } from '@shared/api/localQuery';

export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<ITask[], void>({
      queryFn: () => localQuery(() => TaskRepository.getAll()),
      providesTags: ['Task'],
    }),

    getFilteredTasks: build.query<ITask[], { type: SearchFilterType; value: string }>({
      queryFn: ({ type, value }) => localQuery(() => TaskRepository.filter(value, type)),
      providesTags: ['Task'],
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
      invalidatesTags: ['Task'],
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
} = taskApi;
