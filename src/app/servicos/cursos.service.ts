import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  colecaoCurso: any[] = [];
  key = 'cursos';
  constructor() {}

  salvarCurso(nome: string, instEnsino: string) {
    const recebido = { nome: nome, instituicaoEnsino: instEnsino };

    const value = localStorage.getItem(this.key);

    if (value === undefined || value === null) {
      this.colecaoCurso.push(recebido);
      localStorage.setItem(this.key, JSON.stringify(this.colecaoCurso));
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
    const result = value.filter((cursos) => cursos.nome !== param);

    localStorage.setItem(this.key, JSON.stringify(result));
  }
}
