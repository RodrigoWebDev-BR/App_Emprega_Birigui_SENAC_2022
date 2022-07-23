import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  colecaoCurso: any[] = [];
  key = 'curso';
  constructor() { }

  salvarCurso(nomes: string, instituicoes: string, dtinicio: string, dtfinal: string) {

    const recebido = { 
      nome: nomes, 
      instituicaoEnsino: instituicoes, 
      dataInicio: dtinicio, 
      dataConclusao: dtfinal }
      
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
      return
    }

    const colecao: any[] = JSON.parse(value)
    return colecao;
  }

  deletar(param: any) {
    const value = this.listar()
    const result = value.filter(cursos => cursos.nome !== param)

    localStorage.setItem(this.key, JSON.stringify(result))
  }
}
