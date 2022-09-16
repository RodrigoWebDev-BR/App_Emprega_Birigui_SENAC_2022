import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormEducacionalService {
  colecaoForm: any[] = [];
  key = 'formEducional';
  constructor() {}

  salvarForm(inst: string, nome: string, conclusao: string, niveis: string) {
    const recebido = {
      instituicao: inst,
      curso: nome,
      nivel: niveis,
      situacao: conclusao,
    };

    const value = localStorage.getItem(this.key);

    if (value === undefined || value === null) {
      this.colecaoForm.push(recebido);
      localStorage.setItem(this.key, JSON.stringify(this.colecaoForm));
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
    const result = value.filter((formacoes) => formacoes.instituicao !== param);

    localStorage.setItem(this.key, JSON.stringify(result));
  }
}
