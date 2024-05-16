import { PensamentoService } from '../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: 'I love Angular',
    autoria: 'Nay',
    modelo: 'modelo3',
    favorito: false,
  };

  @Input() listafavoritos: Pensamento[] = [];

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {}

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }
  mudariconefavorito(): string {
    if (this.pensamento.favorito == false) {
      return 'inativo';
    } else {
      return 'ativo';
    }
  }

  atualizarfavorito() {
    this.service.mudarfavorito(this.pensamento).subscribe(() => {
      this.listafavoritos.splice(
        this.listafavoritos.indexOf(this.pensamento),
        1
      );
    });
  }
}
