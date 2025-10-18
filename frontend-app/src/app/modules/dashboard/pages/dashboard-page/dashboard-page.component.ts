import { Component } from '@angular/core';
import DashboardLayoutComponent from '../../../../layouts/dashboard-layout/dashboard-layout.component';
import { TasksListComponent } from '../../components/tasks-list/tasks-list.component';

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
  imports: [DashboardLayoutComponent, TasksListComponent],
  templateUrl: './dashboard-page.component.html',
  styles: ``,
})
export default class DashboardPageComponent {
  tasks: Task[] = [
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
}
