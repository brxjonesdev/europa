export interface Topic {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  createdAt: string | Date;
  learningObjectives?: LearningObjective[];
  reasoning?: string;
  resources?: Resource[];
  notes?: Note[];
}

export interface LearningObjective {
  id: string;
  topicId: string;
  title: string;
  description?: string;
  reasoning?: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  learningObjectiveId: string;
  description?: string;
  completed: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description?: string;
  link: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
