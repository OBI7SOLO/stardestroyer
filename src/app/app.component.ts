import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private alertController: AlertController) {}

  async mostrarMensaje() {
    const alert = await this.alertController.create({
      header: '¡Hola!',
      message: '¡Mensaje desde app híbrida!',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
