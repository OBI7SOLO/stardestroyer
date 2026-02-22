import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsPage } from './albums.page';
import { AlbumDetailPage } from './album-detail/album-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AlbumsPage,
  },
  {
    path: ':id',
    component: AlbumDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumsPageRoutingModule {}
