import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Define la interfaz para el Gif
interface Gif {
  title: string;
  url: string;
}

// Define la respuesta de la API
interface GiphyResponse {
  data: GifResponse[];
}

interface GifResponse {
  title: string;
  images: {
    original: {
      url: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = 'https://api.giphy.com/v1/gifs/search?';
  private readonly apiKey = 'GQXZHMgeH5KrDHinOEATYcjqpQ0mR5pd';
  private readonly limit = 40; // Renderizando solo 40 gifs
  private readonly offset = 0;
  private readonly rating = 'r';
  private readonly lang = 'en';
  private readonly bundle = 'sticker_layering';

  constructor(private http: HttpClient) {}

  // Método GET para obtener datos de la API
  getData(filtro: string): Observable<Gif[]> {
    const filtroParseado = this.encodeFilter(filtro);

    return this.http.get<GiphyResponse>(
      `${this.apiUrl}api_key=${this.apiKey}&q=${filtroParseado}&limit=${this.limit}&offset=${this.offset}&rating=${this.rating}&lang=${this.lang}&bundle=${this.bundle}`
    ).pipe(
      map(response => this.transformResponse(response)),
      catchError(error => {
        console.error('Error en la solicitud HTTP', error);
        return of([]); // Devuelve un arreglo vacío en caso de error
      })
    );
  }

  // Método para codificar el filtro
  private encodeFilter(filtro: string): string {
    return filtro.replace(/ /g, '+');
  }

  // Método para transformar la respuesta de la API
  private transformResponse(response: GiphyResponse): Gif[] {
    return response.data.map(gif => ({
      title: gif.title,
      url: gif.images.original.url,
    }));
  }
}
