import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Importa Ionicons y registra los íconos necesarios
import { addIcons } from 'ionicons';
import { camera, add, trash, save } from 'ionicons/icons';

// Registra los íconos utilizados en la aplicación
addIcons({
  camera,
  add,
  trash,
  save,
});

// Registra los elementos de PWA
defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
