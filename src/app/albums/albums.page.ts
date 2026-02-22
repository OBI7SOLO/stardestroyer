import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AlbumsService } from '../services/albums.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
  standalone: false,
})
export class AlbumsPage implements OnInit {
  constructor(
    public albumsService: AlbumsService,
    private alertController: AlertController,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.albumsService.loadAlbums();
  }

  async createAlbum() {
    const alert = await this.alertController.create({
      header: 'Nuevo Álbum',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Título del álbum',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.title) {
              this.albumsService.createAlbum(data.title);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  openAlbum(albumId: string) {
    this.navCtrl.navigateForward(`/albums/${albumId}`);
  }

  openFavorites() {
    this.navCtrl.navigateForward('/albums/favorites');
  }
}
