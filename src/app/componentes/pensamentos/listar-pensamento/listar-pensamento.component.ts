import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaatual: number = 1;
  hamaispensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listafavoritos: Pensamento[] = [];
  titulo: string = 'Meu mural';
  constructor(private service: PensamentoService, private router: Router) {}

  ngOnInit(): void {
    this.service
      .listar(this.paginaatual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  carregarmaispensamentos() {
    this.service
      .listar(++this.paginaatual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos.push(...listaPensamentos);
        if (!listaPensamentos.length) {
          this.hamaispensamentos = false;
        }
      });
    // spread operator(...), pois eu quero que venham oq já existe e mais o resto
  }

  pesquisarpensamentos() {
    this.hamaispensamentos = true; // quero que o botão de carregarmaispensamentos seja renderizado
    this.paginaatual = 1; // quando a pessoa pesquise, eu quero que seja a primeira página
    this.service
      .listar(this.paginaatual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  listarfavoritos() {
    this.titulo = 'Meus favoritos';
    this.favoritos = true;
    this.hamaispensamentos = true;
    this.paginaatual = 1;
    this.service
      .listar(this.paginaatual, this.filtro, this.favoritos)
      .subscribe((listapensamentos_favoritos) => {
        this.listaPensamentos = listapensamentos_favoritos;
        this.listafavoritos = listapensamentos_favoritos;
      });
  }

  recarregarcomponente() {
    this.favoritos = false;
    this.paginaatual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
