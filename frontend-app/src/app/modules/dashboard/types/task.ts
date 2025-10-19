export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFirebaseTask {
  userId: string;
  title: string;
  description: string;
}

export interface UpdateFirebaseTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
