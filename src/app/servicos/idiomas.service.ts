import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdiomasService {
  colecaoIdioma: any[] = [];
  key = 'idiomas';
  constructor() { }

  salvarIdiomas(id_idioma: string, nivel: string, bandeira: string) {
    const recebido = { id_idioma: id_idioma, nivel: nivel, bandeira: bandeira }

    const value = localStorage.getItem(this.key);

    if (value === undefined || value === null) {
      this.colecaoIdioma.push(recebido);
      localStorage.setItem(this.key, JSON.stringify(this.colecaoIdioma));
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

  redundante(param: any): boolean {
    const value = this.listar();

    if (value !== undefined) {
      const result = value.filter(idiomas => idiomas.id_idioma === param)

      if (result.length === 0) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  deletar(param: any) {
    const value = this.listar()
    const result = value.filter(idiomas => idiomas.id_idioma !== param)

    localStorage.setItem(this.key, JSON.stringify(result))

  }
}
