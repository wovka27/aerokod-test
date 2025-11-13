import { Skeleton } from '@shared/ui/skeleton/Skeleton';

export const TaskDetailSkeleton = () => (
  <div className="container mx-auto max-w-4xl p-6">
    <Skeleton
      className="h-9 w-28 mb-6"
      rounded="sm"
    />

    <div className="bg-gray-900 rounded-xl p-8 space-y-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-80" />
        <div className="flex gap-2">
          <Skeleton
            className="h-9 w-9"
            rounded="sm"
          />
          <Skeleton
            className="h-9 w-9"
            rounded="sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton
          className="h-20 w-full"
          rounded="lg"
        />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-7 w-36" />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton
          className="h-3 w-full"
          rounded="full"
        />
        <div className="flex justify-between text-xs">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton
          className="h-7 w-32"
          rounded="full"
        />
      </div>

      <Skeleton className="h-5 w-48" />

      <div className="flex gap-3 pt-6 border-t border-gray-800">
        <Skeleton
          className="h-11 flex-1"
          rounded="sm"
        />
        <Skeleton
          className="h-11 flex-1"
          rounded="sm"
        />
      </div>
    </div>
  </div>
);
