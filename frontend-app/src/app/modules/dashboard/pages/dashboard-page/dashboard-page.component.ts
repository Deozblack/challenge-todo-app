import { Component, computed, inject } from '@angular/core';
import { DialogService } from '../../../../core/services/dialog.service';
import DashboardLayoutComponent from '../../../../layouts/dashboard-layout/dashboard-layout.component';
import { CreateTaskDialogComponent } from '../../components/create-taks-dialog/create-task-dialog.component';
import { DeleteTaskDialogComponent } from '../../components/delete-task-dialog/delete-task-dialog.component';
import { TasksListComponent } from '../../components/tasks-list/tasks-list.component';
import { UpdateTaskDialogComponent } from '../../components/update-task-dialog/update-task-dialog.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    TasksListComponent,
    CreateTaskDialogComponent,
    UpdateTaskDialogComponent,
    DeleteTaskDialogComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styles: ``,
})
export default class DashboardPageComponent {
  private dialogService = inject(DialogService);
  private taskService = inject(TaskService);

  public tasks = computed(() => this.taskService.tasks());

  showCreateDialog() {
    this.dialogService.openCreateTaskDialog();
  }

  getTasksCompletedCount() {
    return this.tasks().filter((task) => task.completed).length;
  }

  getTasksPendingCount() {
    return this.tasks().filter((task) => !task.completed).length;
  }
}
