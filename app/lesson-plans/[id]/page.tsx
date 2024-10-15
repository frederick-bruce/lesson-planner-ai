import { Suspense } from 'react';
import LessonPlanDetail from '@/components/lesson-plan-detail';
import Loading from '@/components/loading';

export default function LessonPlanDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<Loading />}>
        <LessonPlanDetail id={params.id} />
      </Suspense>
    </div>
  );
}