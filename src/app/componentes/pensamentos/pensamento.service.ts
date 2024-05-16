import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  listar(
    pagina: number,
    filtro: string,
    favoritos: boolean
  ): Observable<Pensamento[]> {
    const itensporpagina = 6;
    let param = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itensporpagina);
    /* return this.http.get<Pensamento[]>(
      `${this.API}?_pages=${pagina}&_limit=${itensporpagina}`
    );*/

    if (filtro.trim().length > 2) {
      param = param.set('q', filtro);
    }
    if (favoritos) {
      param = param.set('favorito', true);
    }
    return this.http.get<Pensamento[]>(this.API, { params: param });
  }

  /* listarpensamento_favorito(
    pagina: number,
    filtro: string
  ): Observable<Pensamento[]> {
    const itensporpagina = 6;
    let params = new HttpParams()
      .set('page', pagina)
      .set('_limit', itensporpagina)
      .set('favorito', true);
    if (filtro.trim().length > 2) {
      params = params.set('q', filtro);
    }
    return this.http.get<Pensamento[]>(this.API, { params });
  }
*/
  criar(pensamento: Pensamento): Observable<Pensamento> {
    return this.http.post<Pensamento>(this.API, pensamento);
  }

  editar(pensamento: Pensamento): Observable<Pensamento> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
  }

  excluir(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Pensamento>(url);
  }

  buscarPorId(id: number): Observable<Pensamento> {
    const url = `${this.API}/${id}`;
    return this.http.get<Pensamento>(url);
  }

  mudarfavorito(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito;
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<Pensamento>(url, pensamento);
    //ou return this.editar(pensamento)
  }
}
