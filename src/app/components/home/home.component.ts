import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent {
  inicializar = 'Dragon Ball Z';
  filtro: string = ''; // Inicializa la propiedad
  gifs: { title: string; url: string }[] = []; // Propiedad para almacenar los GIFs
  elementos: string[] = []; // Lista para almacenar los elementos del LI

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // inicializando 
    this.buscarGifs(this.inicializar); 
    this.elementos.push(this.inicializar);
  }
  buscarGifs(texto: string) {
    if (texto.trim()) {
      this.apiService.getData(texto).subscribe((data) => {
        this.gifs = data;
        if(this.filtro){
          this.elementos.push(this.filtro);
        }
        this.filtro = '';
      
        
      });
    }
  }

 
}
