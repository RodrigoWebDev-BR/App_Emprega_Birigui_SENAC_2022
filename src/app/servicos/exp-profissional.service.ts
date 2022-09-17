import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExpProfissionalService {
  colecaoExp: any[] = [];
  key = 'exp-profissional';
  constructor() {}

  salvarExp(
    empresas: string,
    cargos: string,
    admissao: string,
    demissao: string,
    empAtual: boolean,
    desc: string
  ) {
    const recebido = {
      empresa: empresas,
      cargo: cargos,
      dtInicio: admissao,
      dtFinal: demissao,
      atual: empAtual,
      descricao: desc,
    };

    const value = localStorage.getItem(this.key);

    if (value === undefined || value === null) {
      this.colecaoExp.push(recebido);
      localStorage.setItem(this.key, JSON.stringify(this.colecaoExp));
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
    const result = value.filter((experiencia) => experiencia.cargo !== param);

    localStorage.setItem(this.key, JSON.stringify(result));
  }
}
