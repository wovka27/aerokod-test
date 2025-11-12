import { useUpdateTaskMutation } from '@entities/task/api/task.api';
import type { ITask } from '@entities/task/model/task.types';
import TaskForm from '@entities/task/ui/TaskForm';
import { time } from '@shared/lib/utils/formatTime';
import type { ModalProps } from '@shared/ui/modal/model/modal.types';

const EditTaskForm: React.FC<Omit<ModalProps, 'title' | 'children'> & { task: ITask }> = ({
  isOpen,
  onClose,
  task,
}) => {
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  return (
    <TaskForm
      title="Редактирование задачи"
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
      submit={(dto) => updateTask({ dto, id: task.id })}
      initialValues={{
        name: task.name,
        description: task.description,
        estimatedTime: time.toHhMm(+task.estimatedTime),
      }}
    />
  );
};

export default EditTaskForm;
