export interface Topic {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  createdAt: string | Date;
  objectives?: Objective[];
  reasoning?: string;
}

export interface Objective {
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
  objectiveId: string;
  description?: string;
  completed: boolean;
}

