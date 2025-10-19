export interface Task {
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
