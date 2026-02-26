import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { v4 as uuidv4 } from 'uuid';

export interface Album {
  id: string;
  title: string;
  description?: string;
  coverPhotoId?: string;
  photoIds: string[];
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  public albums: Album[] = [];
  private ALBUM_STORAGE: string = 'albums';

  constructor() {
    this.loadAlbums();
  }

  /**
   * Carga la lista de álbumes desde el almacenamiento persistente (Preferences).
   */
  public async loadAlbums() {
    const { value } = await Preferences.get({ key: this.ALBUM_STORAGE });
    this.albums = value ? JSON.parse(value) : [];
  }

  /**
   * Crea un nuevo álbum con un ID único y lo guarda.
   * @param title Título del álbum
   * @param description Descripción opcional
   */
  public async createAlbum(title: string, description?: string) {
    const newAlbum: Album = {
      id: uuidv4(),
      title: title,
      description: description,
      photoIds: [],
      createdAt: new Date(),
    };

    this.albums.unshift(newAlbum);
    await this.saveAlbums();
    return newAlbum;
  }

  public async deleteAlbum(albumId: string) {
    this.albums = this.albums.filter((a) => a.id !== albumId);
    await this.saveAlbums();
  }

  /**
   * Añade una foto existente a un álbum específico.
   * Si es la primera foto, la establece como portada del álbum.
   */
  public async addPhotoToAlbum(albumId: string, photoId: string) {
    const album = this.albums.find((a) => a.id === albumId);
    if (album && !album.photoIds.includes(photoId)) {
      album.photoIds.push(photoId);
      // Set cover photo if it's the first photo
      if (!album.coverPhotoId) {
        album.coverPhotoId = photoId;
      }
      await this.saveAlbums();
    }
  }

  public async removePhotoFromAlbum(albumId: string, photoId: string) {
    const album = this.albums.find((a) => a.id === albumId);
    if (album) {
      album.photoIds = album.photoIds.filter((id) => id !== photoId);
      if (album.coverPhotoId === photoId) {
        // If cover photo is removed, set the next one or undefined
        album.coverPhotoId =
          album.photoIds.length > 0 ? album.photoIds[0] : undefined;
      }
      await this.saveAlbums();
    }
  }

  private async saveAlbums() {
    await Preferences.set({
      key: this.ALBUM_STORAGE,
      value: JSON.stringify(this.albums),
    });
  }
}
