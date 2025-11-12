import { useCreateTaskMutation } from '@entities/task/api/task.api';
import type { CreateTaskDto } from '@entities/task/model/task.types';
import TaskForm from '@entities/task/ui/TaskForm';
import type { ModalProps } from '@shared/ui/modal/model/modal.types';

const CreateTaskForm: React.FC<Omit<ModalProps, 'title' | 'children'>> = ({ isOpen, onClose }) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  return (
    <TaskForm
      title="Создание задачи"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      submit={(dto) => createTask(dto as CreateTaskDto)}
    />
  );
};

export default CreateTaskForm;
