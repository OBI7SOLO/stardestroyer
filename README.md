# StarDestroyer - Galería de Fotos con Ionic

Este proyecto es una aplicación móvil desarrollada con **Ionic Framework** y **Angular**, utilizando **Capacitor** para el acceso a funcionalidades nativas del dispositivo.

La aplicación permite gestionar una galería de fotos personal, organizarlas en álbumes y marcarlas como favoritas.

## Características Principales

*   **Cámara:** Toma fotos utilizando la cámara del dispositivo móvil o la webcam en el navegador.
*   **Galería:** Visualiza todas las fotos capturadas en una cuadrícula.
*   **Álbumes:**
    *   Crear nuevos álbumes personalizados.
    *   Añadir fotos de la galería a múltiples álbumes.
    *   Visualizar fotos por álbum.
*   **Favoritos:** Marca tus fotos preferidas para acceder a ellas rápidamente.
*   **Persistencia de Datos:** Las fotos y los álbumes se guardan localmente utilizando `Capacitor Preferences` y `Capacitor Filesystem`, por lo que los datos no se pierden al cerrar la aplicación.
*   **Multiplataforma:** Funciona en Android, iOS y Web (PWA).

## Tecnologías Utilizadas

*   **Ionic Framework 8**
*   **Angular 20**
*   **Capacitor 8**
    *   `@capacitor/camera`: Para capturar imágenes.
    *   `@capacitor/filesystem`: Para guardar las imágenes en el sistema de archivos del dispositivo.
    *   `@capacitor/preferences`: Para guardar los metadatos de las fotos y los álbumes (anteriormente Storage).
*   `@ionic/pwa-elements`: Para soporte de cámara en la web.

## Instalación y Ejecución

Asegúrate de tener instalado Node.js y las herramientas de Ionic CLI.

1.  **Instalar dependencias:**

    ```bash
    npm install
    ```

2.  **Ejecutar en el navegador (Desarrollo):**

    ```bash
    ionic serve
    ```

3.  **Ejecutar en Android:**

    Primero, sincroniza el proyecto con Capacitor:

    ```bash
    npx cap sync android
    ```

    Luego abre el proyecto en Android Studio:

    ```bash
    npx cap open android
    ```

4.  **Ejecutar en iOS:**

    Sincroniza el proyecto:

    ```bash
    npx cap sync ios
    ```

    Abre el proyecto en Xcode:

    ```bash
    npx cap open ios
    ```

## Estructura del Proyecto

*   `src/app/services/photo.ts`: Servicio encargado de la lógica de la cámara y el almacenamiento de fotos.
*   `src/app/services/albums.service.ts`: Servicio para la gestión de álbumes (crear, borrar, añadir fotos).
*   `src/app/home`: Página principal con la galería de fotos.
*   `src/app/albums`: Página de listado de álbumes.
*   `src/app/albums/album-detail`: Página de detalle para ver las fotos dentro de un álbum o favoritos.
