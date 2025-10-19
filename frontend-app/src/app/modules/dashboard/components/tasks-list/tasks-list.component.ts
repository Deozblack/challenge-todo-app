import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { DialogService } from '../../../../core/services/dialog.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../types/task';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './tasks-list.component.html',
  styles: ``,
})
export class TasksListComponent {
  private taskService = inject(TaskService);
  private dialogService = inject(DialogService);

  public tasks = computed(() => this.taskService.tasks());

  toggleTaskCompleted(taskId: Task): void {
    this.taskService.toggleTaskCompleted$(taskId).subscribe({
      next: () => {
        console.log('Estado de tarea actualizado');
      },
      error: (error) => {
        console.error('Error al actualizar el estado de la tarea:', error);
      },
    });
  }

  openDeleteDialog(taskId: string): void {
    this.taskService.setSelectedTaskId(taskId);
    this.dialogService.openDeleteTaskDialog();
  }

  openUpdateDialog(taskId: string): void {
    this.taskService.setSelectedTaskId(taskId);
    this.dialogService.openUpdateTaskDialog();
  }
}
