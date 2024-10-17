"use client";

import React, { useState } from 'react';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import WelcomeCard from "@/components/welcome-card";
import QuickActionsCard from "@/components/quick-actions-card";
import RecentItemsCard from "@/components/recent-items-card";
import WorksheetCreator from "@/components/worksheet-creator";
import TemplateCreator from "@/components/template-creator";
import LessonPlanCreator from "@/components/lesson-plan-creator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Page() {
  const [creatorOpen, setCreatorOpen] = useState<'worksheet' | 'template' | 'lessonPlan' | null>(null);
  const userName = useQuery(api.users.getCurrentUser)?.name || "Teacher";

  const handleReadMoreClick = () => {
    // Handle the click event, e.g., navigate to a full update page
    console.log("Navigate to full update page");
  };

  const handleCreateItem = (type: 'worksheet' | 'template' | 'lessonPlan') => {
    setCreatorOpen(type);
  };

  const handleCloseCreator = () => {
    setCreatorOpen(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <WelcomeCard 
          userName={userName}
          onReadMoreClick={handleReadMoreClick}
        />
        <QuickActionsCard 
          onCreateWorksheet={() => handleCreateItem('worksheet')}
          onCreateTemplate={() => handleCreateItem('template')}
          onCreateLessonPlan={() => handleCreateItem('lessonPlan')}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RecentItemsCard title="Recent Worksheets" type="worksheet" />
        <RecentItemsCard title="Recent Templates" type="template" />
        <RecentItemsCard title="Recent Lesson Plans" type="lessonPlan" />
      </div>

      <Dialog open={creatorOpen !== null} onOpenChange={() => setCreatorOpen(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {creatorOpen === 'worksheet' && "Create New Worksheet"}
              {creatorOpen === 'template' && "Create New Template"}
              {creatorOpen === 'lessonPlan' && "Create New Lesson Plan"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details to create a new {creatorOpen}.
            </DialogDescription>
          </DialogHeader>
          {creatorOpen === 'worksheet' && <WorksheetCreator onComplete={handleCloseCreator} />}
          {creatorOpen === 'template' && <TemplateCreator onComplete={handleCloseCreator} />}
          {creatorOpen === 'lessonPlan' && <LessonPlanCreator onComplete={handleCloseCreator} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}