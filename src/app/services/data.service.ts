import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private posts: Post[] = []; // Usa la interfaz Post

  addPost(post: Post) {
    this.posts.unshift(post); // Agrega al inicio de la lista
  }

  getPosts(): Post[] {
    return this.posts; // Devuelve un array de tipo Post[]
  }

  deletePost(post: Post): void {
    const index = this.posts.indexOf(post);
    if (index > -1) {
      this.posts.splice(index, 1);
    }
  }
}
