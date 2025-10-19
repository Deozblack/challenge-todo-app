import { Component, inject } from '@angular/core';
import { DialogService } from '../../../../core/services/dialog.service';
import DashboardLayoutComponent from '../../../../layouts/dashboard-layout/dashboard-layout.component';
import { CreateTaskDialogComponent } from '../../components/create-taks-dialog/create-task-dialog.component';
import { TasksListComponent } from '../../components/tasks-list/tasks-list.component';
import { UpdateTaskDialogComponent } from '../../components/update-task-dialog/update-task-dialog.component';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    TasksListComponent,
    CreateTaskDialogComponent,
    UpdateTaskDialogComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styles: ``,
})
export default class DashboardPageComponent {
  private dialogService = inject(DialogService);

  public tasks: Task[] = [
    {
      id: '1',
      title: 'Revisar emails',
      description: 'Responder emails importantes del día',
      completed: false,
      createdAt: new Date('2024-10-18T09:00:00'),
    },
    {
      id: '2',
      title: 'Preparar presentación',
      description: 'Crear slides para la reunión de mañana',
      completed: true,
      createdAt: new Date('2024-10-18T10:30:00'),
    },
    {
      id: '3',
      title: 'Llamar al cliente',
      description: 'Seguimiento del proyecto X',
      completed: false,
      createdAt: new Date('2024-10-18T14:15:00'),
    },
  ];

  showCreateDialog() {
    this.dialogService.openCreateTaskDialog();
  }

  showUpdateDialog() {
    this.dialogService.openUpdateTaskDialog();
  }
}
