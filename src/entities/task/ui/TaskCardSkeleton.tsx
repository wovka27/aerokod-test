import { Button } from '@shared/ui/button/Button';
import { Card } from '@shared/ui/card/Card';

export const TaskCardSkeleton: React.FC = () => {
  return (
    <Card className="p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6 mt-1"></div>
        </div>
        <div className="ml-4 w-20 h-6 bg-gray-700 rounded-full"></div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Прогресс:</span>
          <span className="font-medium text-gray-400">00:00/01:00</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2"></div>
      </div>

      {/* Кнопки */}
      <div className="flex gap-2 items-center">
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          disabled
        >
          <div className="h-4 bg-transparent rounded w-16"></div>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled
        >
          <div className="w-4 h-4 bg-transparent rounded"></div>
        </Button>
        <Button
          variant="danger"
          size="sm"
          disabled
        >
          <div className="w-4 h-4 bg-transparent rounded"></div>
        </Button>
      </div>
    </Card>
  );
};
