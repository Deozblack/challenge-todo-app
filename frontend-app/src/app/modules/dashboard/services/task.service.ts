import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { CreateFirebaseTask, Task, UpdateFirebaseTask } from '../types/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http$ = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private authService = inject(AuthService);

  private _tasks = signal<Task[]>([]);
  private _selectedTaskId = signal<string | null>(null);

  public tasks = computed(() => this._tasks());
  public selectedTaskId = computed(() => this._selectedTaskId());

  constructor() {
    this.findAllTasks$().subscribe();
  }

  createTask$(taskData: {
    title: string;
    description: string;
  }): Observable<void> {
    const user = this.authService.getCurrentUser();

    const data: CreateFirebaseTask = {
      userId: user()!.uid,
      title: taskData.title,
      description: taskData.description,
    };

    return this.http$.post<void>(`${this.apiUrl}/tasks`, data).pipe(
      tap(() => {
        this.findAllTasks$().subscribe();
      })
    );
  }

  updateTask$(
    taskId: string,
    taskData: {
      title: string;
      description: string;
      completed: boolean;
    }
  ): Observable<void> {
    const data: UpdateFirebaseTask = {
      id: taskId,
      title: taskData.title,
      description: taskData.description,
      completed: taskData.completed,
    };
    return this.http$.put<void>(`${this.apiUrl}/tasks/${taskId}`, data).pipe(
      tap(() => {
        this.findAllTasks$().subscribe();
      })
    );
  }

  toggleTaskCompleted$(task: Task): Observable<void> {
    const newCompletedState = !task.completed;
    return this.http$
      .put<void>(`${this.apiUrl}/tasks/${task.id}`, {
        ...task,
        completed: newCompletedState,
      })
      .pipe(
        tap(() => {
          this._tasks.update((tasks) =>
            tasks.map((t) =>
              t.id === task.id ? { ...t, completed: newCompletedState } : t
            )
          );
        })
      );
  }

  deleteTask$(taskId: string): Observable<void> {
    return this.http$.delete<void>(`${this.apiUrl}/tasks/${taskId}`).pipe(
      map(() => {
        this._tasks.update((tasks) =>
          tasks.filter((task) => task.id !== taskId)
        );
        if (this._selectedTaskId() === taskId) {
          this._selectedTaskId.set(null);
        }
      })
    );
  }

  setSelectedTaskId(taskId: string | null): void {
    this._selectedTaskId.set(taskId);
  }

  getSelectedTask(): Task | null {
    const taskId = this._selectedTaskId();
    if (!taskId) return null;
    return this._tasks().find((task) => task.id === taskId) || null;
  }

  findAllTasks$(): Observable<Task[]> {
    return this.http$.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
      map((tasks) => {
        const formattedTasks = tasks.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        this._tasks.set(formattedTasks);
        return formattedTasks;
      })
    );
  }
}
