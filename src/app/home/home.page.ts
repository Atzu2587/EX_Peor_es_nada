import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Post } from '../models/post.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule], // Importamos IonicModule para los componentes de Ionic
})
export class HomePage {
  posts: Post[] = []; // Declaramos un array de publicaciones basado en la interfaz Post

  constructor(private dataService: DataService) {}

  // Cambiamos de ngOnInit a ionViewWillEnter para que se recargue siempre al ingresar
  ionViewWillEnter() {
    this.loadPosts(); // Actualiza las publicaciones cada vez que se entra a la página
  }

  loadPosts() {
    this.posts = this.dataService.getPosts(); // Carga las publicaciones desde el servicio
    console.log('Publicaciones:', this.posts); // Verifica en consola las publicaciones cargadas
  }

  deletePost(post: Post) {
    // Elimina la publicación del servicio y actualiza la lista
    this.dataService.deletePost(post);
    this.loadPosts(); // Recargar publicaciones después de eliminar
  }

  addPost() {
    console.log('Botón flotante presionado');
    // Aquí puedes agregar lógica para redirigir a otra página o abrir un modal para crear una publicación
  }
}