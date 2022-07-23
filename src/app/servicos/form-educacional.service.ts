import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormEducacionalService {
  colecaoEdu: any[]=[];
  key = 'form-educacional'
  constructor() { }

  salvarFormacao(inst: string, nome: string, niveis: string, situacao: string){
    
    const recebido = { instituicao: inst, nomeCurso: nome, nivel: niveis, conclusao: situacao }
    const value = localStorage.getItem(this.key);

    if(value === undefined || value === null){
      this.colecaoEdu.push(recebido);
      localStorage.setItem(this.key, JSON.stringify(this.colecaoEdu));
    }else{
      const colecao: any[] = this.listar();
      colecao.push(recebido);
      localStorage.setItem(this.key, JSON.stringify(colecao));
    }
  }

  listar(){
    const value = localStorage.getItem(this.key);

    if(value === undefined || value === null){
      return
    }

    const colecao: any[] = JSON.parse(value)
    return colecao;
  }

  deletar(param: any){
    const value = this.listar()
    const result = value.filter(formacoes => formacoes.instituicao !== param)

    localStorage.setItem(this.key, JSON.stringify(result))
  }
}
