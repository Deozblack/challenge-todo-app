import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { CreateFirebaseTask } from '../types/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http$ = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private authService = inject(AuthService);

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

    return this.http$.post<void>(`${this.apiUrl}/tasks`, data);
  }
}
