import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpProfissionalService {
  colecaoExp: any[]=[];
  key = 'exp-profissional'
  constructor() { }

  salvarExp(empresa: string, cargo: string, admissao: string, demissao: string, desc: string){
    
    const recebido = { empresa: empresa, cargo: cargo, admissao: admissao, demissao: demissao, desc: desc }
    const value = localStorage.getItem(this.key);

    if(value === undefined || value === null){
      this.colecaoExp.push(recebido);
      localStorage.setItem(this.key, JSON.stringify(this.colecaoExp));
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
    const result = value.filter(experiencia => experiencia.cargo !== param)

    localStorage.setItem(this.key, JSON.stringify(result))
  }
}
