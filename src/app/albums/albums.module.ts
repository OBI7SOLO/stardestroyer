import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AlbumDetailPage } from './album-detail/album-detail.page';
import { AlbumsPage } from './albums.page';
import { AlbumsPageRoutingModule } from './albums-routing.module';
import { ImageModalComponent } from '../components/image-modal/image-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumsPageRoutingModule,
    ImageModalComponent,
  ],
  declarations: [AlbumsPage, AlbumDetailPage],
})
export class AlbumsPageModule {}
