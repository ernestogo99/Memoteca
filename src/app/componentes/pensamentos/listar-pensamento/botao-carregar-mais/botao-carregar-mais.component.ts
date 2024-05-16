import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-botao-carregar-mais',
  templateUrl: './botao-carregar-mais.component.html',
  styleUrls: ['./botao-carregar-mais.component.css'],
})
export class BotaoCarregarMaisComponent implements OnInit {
  @Input() hamaispensamentos: boolean = false; // para receber algo do componente pai
  constructor() {}

  ngOnInit(): void {}
}
