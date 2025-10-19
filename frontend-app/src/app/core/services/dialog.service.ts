import { Injectable, signal } from '@angular/core';

export interface DialogState {
  createTask: boolean;
  updateTask: boolean;
  deleteTask: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _dialogs = signal<DialogState>({
    createTask: false,
    updateTask: false,
    deleteTask: false,
  });

  public dialogs = this._dialogs.asReadonly();

  openCreateTaskDialog(): void {
    this._dialogs.update((state) => ({
      ...state,
      createTask: true,
    }));
  }

  openUpdateTaskDialog(): void {
    this._dialogs.update((state) => ({
      ...state,
      updateTask: true,
    }));
  }

  openDeleteTaskDialog(): void {
    this._dialogs.update((state) => ({
      ...state,
      deleteTask: true,
    }));
  }

  closeCreateTaskDialog(): void {
    this._dialogs.update((state) => ({
      ...state,
      createTask: false,
    }));
  }

  closeUpdateTaskDialog(): void {
    this._dialogs.update((state) => ({
      ...state,
      updateTask: false,
    }));
  }

  closeDeleteTaskDialog(): void {
    this._dialogs.update((state) => ({
      ...state,
      deleteTask: false,
    }));
  }

  closeAllDialogs(): void {
    this._dialogs.set({
      createTask: false,
      updateTask: false,
      deleteTask: false,
    });
  }
}
