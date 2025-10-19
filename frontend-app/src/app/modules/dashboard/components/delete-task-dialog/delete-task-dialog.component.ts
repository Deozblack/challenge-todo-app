import { Component, inject, signal } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { AlertService } from '../../../../core/services/alert.service';
import { DialogService } from '../../../../core/services/dialog.service';
import SpinnerComponent from '../../../../shared/components/spinner/spinner.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-delete-task-dialog',
  standalone: true,
  imports: [Dialog, SpinnerComponent],
  templateUrl: './delete-task-dialog.component.html',
  styles: ``,
})
export class DeleteTaskDialogComponent {
  private dialogService = inject(DialogService);
  private taskService = inject(TaskService);
  private alertService = inject(AlertService);

  public isLoading = signal(false);

  get visibleState() {
    return this.dialogService.dialogs().deleteTask;
  }

  set visibleState(value: boolean) {
    if (!value) {
      this.closeDialog();
    }
  }

  get selectedTask() {
    return this.taskService.getSelectedTask();
  }

  closeDialog(): void {
    this.dialogService.closeDeleteTaskDialog();
  }

  deleteTask(): void {
    const task = this.selectedTask;
    if (!task) return;

    this.isLoading.set(true);

    this.taskService.deleteTask$(task.id).subscribe({
      next: () => {
        this.closeDialog();
        this.alertService.createAlert({
          icon: 'success',
          message: 'Tarea eliminada correctamente.',
        });
      },
      error: (error) => {
        this.alertService.createAlert({
          icon: 'error',
          message: 'Error al eliminar la tarea. Inténtalo de nuevo.',
        });
        this.isLoading.set(false);
        console.error('Error deleting task:', error);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
