import { useUpdateTaskMutation } from '@entities/task/api/task.api';
import type { CreateTaskDto, ITask, UpdateTaskDto } from '@entities/task/model/task.types';
import TaskForm from '@entities/task/ui/TaskForm';
import { time } from '@shared/lib/utils/formatTime';
import type { ModalProps } from '@shared/ui/modal/model/modal.types';

const EditTaskForm: React.FC<Omit<ModalProps, 'title' | 'children'> & { task: ITask }> = ({
  isOpen,
  onClose,
  task,
}) => {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const initialValues = getInitValues(task);
  const submit = (dto: UpdateTaskDto | CreateTaskDto) => updateTask({ dto, id: task.id });

  return (
    <TaskForm
      title="Редактирование задачи"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      submit={submit}
      initialValues={initialValues}
    />
  );
};

export default EditTaskForm;

const getInitValues = (task: ITask) => ({
  name: task.name,
  description: task.description,
  estimatedTime: time.toHhMm(+task.estimatedTime),
});
