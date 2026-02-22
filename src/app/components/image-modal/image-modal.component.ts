import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserPhoto } from '../../services/photo';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
  standalone: false,
})
export class ImageModalComponent implements OnInit {
  @Input() photo!: UserPhoto;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
}
