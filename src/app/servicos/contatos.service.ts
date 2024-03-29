import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContatosService {
  colecaoContato: any[] = [];
  key = 'contatos';
  constructor() {}

  salvarContato(tipos: string, contatos: string, validados: boolean) {
    const recebido = { tipo: tipos, contato: contatos , validado: validados};
    const value = localStorage.getItem(this.key);

    if (value === undefined || value === null) {
      this.colecaoContato.push(recebido);
      localStorage.setItem(this.key, JSON.stringify(this.colecaoContato));
    } else {
      const colecao: any[] = this.listar();
      colecao.push(recebido);
      localStorage.setItem(this.key, JSON.stringify(colecao));
    }
  }

  listar() {
    const value = localStorage.getItem(this.key);

    if (value === undefined || value === null) {
      return;
    }

    const colecao: any[] = JSON.parse(value);
    return colecao;
  }

  deletar(param: any) {
    const value = this.listar();
    const result = value.filter((contatos) => contatos.contato !== param);

    localStorage.setItem(this.key, JSON.stringify(result));
  }
}
