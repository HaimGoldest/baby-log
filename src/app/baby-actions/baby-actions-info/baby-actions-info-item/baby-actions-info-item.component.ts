import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BabyActionDataModel } from '../../../models/baby-action-data.model';

@Component({
  selector: 'app-baby-actions-info-item',
  templateUrl: './baby-actions-info-item.component.html',
  styleUrl: './baby-actions-info-item.component.css',
})
export class BabyActionsInfoItemComponent {
  @Input() babyActionData: BabyActionDataModel | undefined;
  @Input() index: number | undefined;
  @ViewChild('descriptionTextarea', { static: true })
  descriptionTextareaRef: ElementRef;
  editMode = false;

  onStartEditMode(event: MouseEvent) {
    event.preventDefault();
    this.editMode = true;
  }

  onEditSubmit(newDescription: string) {
    this.babyActionData.description = newDescription;
    this.editMode = false;
  }

  onCancelEdit() {
    this.editMode = false;
  }
}
