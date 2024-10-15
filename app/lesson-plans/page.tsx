import { Suspense } from 'react';
import LessonPlanList from '@/components/lesson-plan-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Loading from '@/components/loading';

export default function LessonPlansPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Lesson Plans</h1>
        <Link href="/lesson-plans/new">
          <Button>Create New Lesson Plan</Button>
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        <LessonPlanList />
      </Suspense>
    </div>
  );
}