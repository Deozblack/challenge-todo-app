import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { AuthService } from '../../auth/services/auth.service';
import { Task } from '../types/task';
import { signal } from '@angular/core';
import { User } from '@angular/fire/auth';

describe('TaskService', () => {
  let service: TaskService;
  let httpTestingController: HttpTestingController;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  const mockUserData = {
    uid: 'test-user-123',
    email: 'test@example.com',
  } as User;
  const mockUser = signal<User | null>(mockUserData);

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Test Task 1',
      description: 'Test Description 1',
      completed: false,
      userId: 'test-user-123',
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
    },
    {
      id: '2',
      title: 'Test Task 2',
      description: 'Test Description 2',
      completed: true,
      userId: 'test-user-123',
      createdAt: new Date('2025-01-02'),
      updatedAt: new Date('2025-01-02'),
    },
  ];

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
    mockAuthService.getCurrentUser.and.returnValue(mockUser);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskService,
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    service = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

    const req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should get tasks for authenticated user', () => {
    const req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);

    expect(service.tasks().length).toBe(2);
    expect(service.tasks()[0].completed).toBe(false);
    expect(service.tasks()[1].completed).toBe(true);
  });

  it('should sort tasks with pending tasks first', () => {
    const req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    const tasks = service.tasks();
    expect(tasks[0].completed).toBe(false);
    expect(tasks[tasks.length - 1].completed).toBe(true);
  });

  it('should convert date strings to Date objects', () => {
    const req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    const tasks = service.tasks();
    expect(tasks[0].createdAt instanceof Date).toBe(true);
    expect(tasks[0].updatedAt instanceof Date).toBe(true);
  });

  it('should create a task', (done) => {
    let req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush([]);

    const taskData = { title: 'New Task', description: 'New Description' };

    service.createTask$(taskData).subscribe({
      next: () => {
        done();
      },
      error: done.fail,
    });

    req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body.title).toBe('New Task');
    expect(req.request.body.description).toBe('New Description');
    expect(req.request.body.userId).toBe('test-user-123');
    req.flush({});

    req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);
  });

  it('should update a task', (done) => {
    let req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    const updateData = {
      title: 'Updated Task',
      description: 'Updated Description',
      completed: true,
    };

    service.updateTask$('1', updateData).subscribe({
      next: () => {
        done();
      },
      error: done.fail,
    });

    req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/1'
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.id).toBe('1');
    expect(req.request.body.title).toBe('Updated Task');
    expect(req.request.body.completed).toBe(true);
    req.flush({});

    req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);
  });

  it('should delete a task', (done) => {
    let req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    service.deleteTask$('1').subscribe({
      next: () => {
        expect(service.tasks().length).toBe(1);
        expect(service.tasks().find((t) => t.id === '1')).toBeUndefined();
        done();
      },
      error: done.fail,
    });

    req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/1'
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should clear selected task when deleting the selected task', (done) => {
    let req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    service.setSelectedTaskId('1');
    expect(service.selectedTaskId()).toBe('1');

    service.deleteTask$('1').subscribe({
      next: () => {
        expect(service.selectedTaskId()).toBeNull();
        done();
      },
      error: done.fail,
    });

    req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/1'
    );
    req.flush({});
  });

  it('should toggle task completion', (done) => {
    let req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    const taskToToggle = service.tasks()[0];
    const originalState = taskToToggle.completed;

    service.toggleTaskCompleted$(taskToToggle).subscribe({
      next: () => {
        const updatedTask = service.tasks().find((t) => t.id === '1');
        expect(updatedTask?.completed).toBe(!originalState);
        done();
      },
      error: done.fail,
    });

    req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/1'
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.completed).toBe(!originalState);
    req.flush({});
  });

  it('should toggle completed task to incomplete', (done) => {
    let req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    const completedTask = service.tasks().find((t) => t.completed === true)!;
    expect(completedTask.completed).toBe(true);

    service.toggleTaskCompleted$(completedTask).subscribe({
      next: () => {
        const updatedTask = service
          .tasks()
          .find((t) => t.id === completedTask.id);
        expect(updatedTask?.completed).toBe(false);
        done();
      },
      error: done.fail,
    });

    req = httpTestingController.expectOne(
      `https://api-qjgqzthhnq-uc.a.run.app/tasks/${completedTask.id}`
    );
    req.flush({});
  });

  it('should set and get selected task', () => {
    const req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    service.setSelectedTaskId('1');
    expect(service.selectedTaskId()).toBe('1');

    const selectedTask = service.getSelectedTask();
    expect(selectedTask?.id).toBe('1');
    expect(selectedTask?.title).toBe('Test Task 1');
  });

  it('should return null when no task is selected', () => {
    const req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    expect(service.selectedTaskId()).toBeNull();
    expect(service.getSelectedTask()).toBeNull();
  });

  it('should return null when selected task does not exist', () => {
    const req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    service.setSelectedTaskId('non-existent-id');
    expect(service.getSelectedTask()).toBeNull();
  });

  it('should clear selected task', () => {
    const req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    service.setSelectedTaskId('1');
    expect(service.selectedTaskId()).toBe('1');

    service.setSelectedTaskId(null);
    expect(service.selectedTaskId()).toBeNull();
    expect(service.getSelectedTask()).toBeNull();
  });

  it('should handle empty task list', () => {
    const req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush([]);

    expect(service.tasks().length).toBe(0);
  });

  it('should expose tasks as computed signal', () => {
    const req = httpTestingController.expectOne(
      'https://api-qjgqzthhnq-uc.a.run.app/tasks/user/test-user-123'
    );
    req.flush(mockTasks);

    const tasksSignal = service.tasks;
    expect(typeof tasksSignal).toBe('function');
    expect(Array.isArray(tasksSignal())).toBe(true);
  });
});
