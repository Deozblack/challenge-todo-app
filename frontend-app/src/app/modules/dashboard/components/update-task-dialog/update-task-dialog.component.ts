import { Component, inject } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { DialogService } from '../../../../core/services/dialog.service';

@Component({
  selector: 'app-update-task-dialog',
  standalone: true,
  imports: [Dialog],
  templateUrl: './update-task-dialog.component.html',
  styles: ``,
})
export class UpdateTaskDialogComponent {
  private dialogService = inject(DialogService);

  get visibleState() {
    return this.dialogService.dialogs().updateTask;
  }

  set visibleState(value: boolean) {
    if (!value) {
      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.dialogService.closeUpdateTaskDialog();
  }
}
