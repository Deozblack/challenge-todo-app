import { Component } from '@angular/core';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [],
  templateUrl: './tasks-list.component.html',
  styles: ``,
})
export class TasksListComponent {
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
