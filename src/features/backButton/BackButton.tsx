import { useRouter } from 'next/navigation';

import { Button } from '@shared/ui/button/Button';

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => router.back()}
      className="mb-6"
    >
      Назад
    </Button>
  );
};

export default BackButton;
