import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { AlertService } from '../../../../core/services/alert.service';
import { DialogService } from '../../../../core/services/dialog.service';
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';
import SpinnerComponent from '../../../../shared/components/spinner/spinner.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  imports: [
    Dialog,
    ReactiveFormsModule,
    ErrorMessageComponent,
    SpinnerComponent,
  ],
  templateUrl: './create-task-dialog.component.html',
  styles: ``,
})
export class CreateTaskDialogComponent {
  private dialogService = inject(DialogService);
  private taskService = inject(TaskService);
  private alertService = inject(AlertService);
  private fb = inject(FormBuilder);

  public isLoading = signal(false);

  public createTaskForm = this.fb.group({
    title: [''],
    description: [''],
  });

  get visibleState() {
    return this.dialogService.dialogs().createTask;
  }

  set visibleState(value: boolean) {
    if (!value) {
      this.closeDialog();
    }
  }

  get titleControl() {
    return this.createTaskForm.get('title');
  }

  get descriptionControl() {
    return this.createTaskForm.get('description');
  }

  closeDialog(): void {
    this.dialogService.closeCreateTaskDialog();
  }

  createTask() {
    if (this.createTaskForm.invalid) {
      this.createTaskForm.markAllAsTouched();
      return;
    }

    const { title, description } = this.createTaskForm.value;

    this.isLoading.set(true);

    this.taskService
      .createTask$({ title: title!, description: description! })
      .subscribe({
        next: () => {
          this.createTaskForm.reset();
          this.closeDialog();
          this.alertService.createAlert({
            icon: 'success',
            message: 'Tarea creada exitosamente.',
          });
        },
        error: (err) => {
          this.alertService.createAlert({
            icon: 'error',
            message: 'Error al crear la tarea. Por favor, inténtalo de nuevo.',
          });
          console.error('Error creating task:', err);
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}
