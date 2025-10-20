import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { AlertService } from '../../../../core/services/alert.service';
import { DialogService } from '../../../../core/services/dialog.service';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import SpinnerComponent from '../../../../shared/components/spinner/spinner.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-update-task-dialog',
  standalone: true,
  imports: [
    Dialog,
    ReactiveFormsModule,
    ErrorMessageComponent,
    SpinnerComponent,
  ],
  templateUrl: './update-task-dialog.component.html',
  styles: ``,
})
export class UpdateTaskDialogComponent {
  private dialogService = inject(DialogService);
  private taskService = inject(TaskService);
  private alertService = inject(AlertService);
  private fb = inject(FormBuilder);

  public isLoading = signal(false);
  private hasLoadedData = signal(false);

  public updateTaskForm = this.fb.group({
    title: [''],
    description: [''],
  });

  get visibleState() {
    const isVisible = this.dialogService.dialogs().updateTask;

    if (isVisible && !this.hasLoadedData()) {
      setTimeout(() => {
        this.loadSelectedTaskData();
        this.hasLoadedData.set(true);
      }, 0);
    }

    if (!isVisible && this.hasLoadedData()) {
      this.hasLoadedData.set(false);
    }

    return isVisible;
  }

  set visibleState(value: boolean) {
    if (!value) {
      this.closeDialog();
    }
  }

  get titleControl() {
    return this.updateTaskForm.get('title');
  }

  get descriptionControl() {
    return this.updateTaskForm.get('description');
  }

  get selectedTask() {
    return this.taskService.getSelectedTask();
  }

  private loadSelectedTaskData(): void {
    const task = this.selectedTask;
    if (task) {
      this.updateTaskForm.patchValue({
        title: task.title,
        description: task.description,
      });
    }
  }

  closeDialog(): void {
    this.dialogService.closeUpdateTaskDialog();
    this.updateTaskForm.reset();
    this.hasLoadedData.set(false);
  }

  updateTask(): void {
    if (this.updateTaskForm.invalid) {
      this.updateTaskForm.markAllAsTouched();
      return;
    }

    const task = this.selectedTask;
    if (!task) {
      this.alertService.createAlert({
        icon: 'error',
        message: 'No hay tarea seleccionada para actualizar.',
      });
      return;
    }

    const { title, description } = this.updateTaskForm.value;

    this.isLoading.set(true);

    this.taskService
      .updateTask$(task.id, {
        title: title!,
        description: description!,
        completed: task.completed,
      })
      .subscribe({
        next: () => {
          this.closeDialog();
          this.alertService.createAlert({
            icon: 'success',
            message: 'Tarea actualizada exitosamente.',
            position: 'bottom',
          });
          this.isLoading.set(false);
        },
        error: (err) => {
          this.alertService.createAlert({
            icon: 'error',
            message:
              'Error al actualizar la tarea. Por favor, inténtalo de nuevo.',
            position: 'bottom',
          });
          console.error('Error updating task:', err);
          this.isLoading.set(false);
        },
      });
  }
}
