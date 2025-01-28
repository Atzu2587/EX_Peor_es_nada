import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel,  AlertController, IonItem, IonButton, IonIcon, IonicModule } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CreatePostPage {
  postForm: FormGroup;
  photo: string | null = null;

  constructor(
    private fb: FormBuilder, // facilita la construccion del formulario
    private alertController: AlertController, // muestra alertas
    private router: Router, // se encarga de redirigir entre páginas
    private dataService: DataService // Servicio para manejar la logica de las publicaciones
  ) {
    // Configuración del formulario con validaciones segun se solicita  con las validaciones.
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]], // Campo obligatorio, mínimo 5 caracteres
      description: ['', [Validators.required, Validators.minLength(20)]], // Campo obligatorio, mínimo 20 caracteres
    });
  }


 /* Método para capturar una foto utilizando la cámara del dispositivo.*/

  async takePhoto() {
    try {
      // Captura la foto usando la cámara
      const image = await Camera.getPhoto({
        quality: 90, // Calidad de la image
        resultType: CameraResultType.DataUrl,
      });
      // Asigna la foto capturada a la variable `photo`
      this.photo = image.dataUrl ?? null;
    } catch (error) {
      console.error('Error al tomar la foto:', error); // Registra el error en la consola
      this.photo = null;   // Reinicia la variable `photo` en caso de error

      // Mostrar alerta en caso de error con un mensaje personalizado
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo tomar la foto. Intenta nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  
  
  /**Método para guardar la publicación.*/
  async savePost() {
     // Verifica si el formulario es inválido
    if (this.postForm.invalid) {
       // Muestra una advertencia al usuario
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: 'Algunos campos no cumplen con las validaciones, pero se guardará de todas formas.',
        buttons: ['OK'],
      });
      await alert.present();
    }

    // Construye el objeto de publicación con los datos del formulario  
    const post = {
      ...this.postForm.value,
      image: this.photo, // Incluye la foto capturada
      date: new Date(), // Agrega la fecha actual
    };

    // Llama al servicio para guardar la publicación
    this.dataService.addPost(post);
    
    console.log('Post guardado:', post); // Registra la publicación en la consola

    // Muestra un mensaje de éxito al usuario
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Publicación guardada correctamente.',
        buttons: ['OK'],
      });
      await alert.present();

      // Reinicia el formulario y la foto
      this.postForm.reset();
      this.photo = null;

      // Navega a la página de inicio
      this.router.navigate(['/home']);
  }
}