import { Component, OnInit } from '@angular/core';
import { PhotoService, UserPhoto } from '../services/photo';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ImageModalComponent } from '../components/image-modal/image-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    private modalController: ModalController,
  ) {}

  /**
   * Al iniciar, cargamos las fotos guardadas.
   */
  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  /**
   * Llama al servicio para tomar una nueva foto y añadirla a la galería.
   */
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Ver',
          icon: 'eye',
          handler: () => {
            this.openPhoto(photo);
          },
        },
        {
          text: photo.isFavorite ? 'Quitar de Favoritos' : 'Favorito',
          icon: photo.isFavorite ? 'heart-dislike' : 'heart',
          handler: () => {
            this.photoService.toggleFavorite(photo);
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async openPhoto(photo: UserPhoto) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        photo: photo,
      },
    });
    return await modal.present();
  }
}
