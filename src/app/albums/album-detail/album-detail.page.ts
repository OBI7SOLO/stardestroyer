import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService, UserPhoto } from '../../services/photo';
import { AlbumsService, Album } from '../../services/albums.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.page.html',
  styleUrls: ['./album-detail.page.scss'],
  standalone: false,
})
export class AlbumDetailPage implements OnInit {
  albumId: string | null = null;
  album: Album | undefined;
  photos: UserPhoto[] = [];
  title: string = '';
  isFavorites: boolean = false;

  isModalOpen = false;
  allPhotos: UserPhoto[] = [];
  selectedPhotos: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private albumsService: AlbumsService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
  ) {}

  async ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id');
    this.loadData();
  }

  loadData() {
    if (this.albumId === 'favorites') {
      this.isFavorites = true;
      this.title = 'Favoritos';
      this.loadFavorites();
    } else if (this.albumId) {
      this.isFavorites = false;
      this.loadAlbum();
    }
  }

  loadFavorites() {
    this.photos = this.photoService.photos.filter((p) => p.isFavorite);
  }

  loadAlbum() {
    this.album = this.albumsService.albums.find((a) => a.id === this.albumId);
    if (this.album) {
      this.title = this.album.title;
      this.photos = this.photoService.photos.filter((p) =>
        this.album?.photoIds.includes(p.id),
      );
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (isOpen) {
      // Load photos not yet in album
      this.allPhotos = this.photoService.photos.filter(
        (p) => !this.album?.photoIds.includes(p.id),
      );
      this.selectedPhotos = [];
    }
  }

  toggleSelection(photoId: string) {
    const index = this.selectedPhotos.indexOf(photoId);
    if (index > -1) {
      this.selectedPhotos.splice(index, 1);
    } else {
      this.selectedPhotos.push(photoId);
    }
  }

  async savePhotosToAlbum() {
    if (this.albumId && this.selectedPhotos.length > 0) {
      for (const photoId of this.selectedPhotos) {
        await this.albumsService.addPhotoToAlbum(this.albumId, photoId);
      }
      this.loadAlbum();
    }
    this.setOpen(false);
  }

  async openPhoto(photo: UserPhoto) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: {
        photo: photo,
      },
    });
    await modal.present();
  }

  async addPhotos() {
    this.setOpen(true);
  }

  async removePhoto(photo: UserPhoto) {
    if (this.isFavorites) {
      this.photoService.toggleFavorite(photo);
      this.loadFavorites(); // Refresh list
    } else if (this.album) {
      await this.albumsService.removePhotoFromAlbum(this.album.id, photo.id);
      this.loadAlbum(); // Refresh list
    }
  }
}
