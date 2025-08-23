export interface Topic {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  createdAt: string;
  learningObjectives?: LearningObjective[];
  reasoning?: string;
  resources?: Resource[];
  notes?: Note[];
}

export interface LearningObjective {
  id: string;
  topicId: string;
  title: string;
  description: string;
  reasoning?: string;
  milestones?: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  learningObjectivesId: string;
  description: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  milestoneId: string;
  description: string;
  completed: boolean;
}

export interface Resource{
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
