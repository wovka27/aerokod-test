import { fields } from '@entities/task/config/fields';
import type { CreateTaskDto, UpdateTaskDto } from '@entities/task/model/task.types';
import { Button } from '@shared/ui/button/Button';
import { FormGenerator } from '@shared/ui/form/ui/FormGenerator';
import { Modal } from '@shared/ui/modal/Modal';
import type { ModalProps } from '@shared/ui/modal/model/modal.types';

type IProps = Omit<ModalProps, 'title' | 'children'> & {
  submit: (dto: UpdateTaskDto | CreateTaskDto) => any;
  initialValues?: Record<string, string>;
  isLoading: boolean;
  title: string;
};

const TaskForm: React.FC<IProps> = ({ onClose, isOpen, submit, initialValues, isLoading, title }) => {
  const onSubmit: (values: Record<string, string>) => Promise<void> = async (values) => {
    const dto = {
      name: values.name,
      description: values.description,
      estimatedTime: values.estimatedTime,
    };

    const mutation = submit(dto);

    await mutation.unwrap();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <FormGenerator
        fields={fields}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <div className="grid grid-cols-2 gap-5">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            отмена
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            сохранить
          </Button>
        </div>
      </FormGenerator>
    </Modal>
  );
};

export default TaskForm;
