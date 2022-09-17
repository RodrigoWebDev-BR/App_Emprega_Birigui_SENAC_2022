import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { validarCNPJ } from 'src/environments/functions';

@Component({
  selector: 'app-lancamento-vaga',
  templateUrl: './lancamento-vaga.page.html',
  styleUrls: ['./lancamento-vaga.page.scss'],
})
export class LancamentoVagaPage implements OnInit {

  vaga = {
    nomeEmpresa: 'Amigão',
    cidade: 'Birigui-SP',
    tituloVaga: '',
    categoria: '',
    contrato: '',
    prazo: '',
    horario: '',
    combinado: false,
    salario: '',
    qualificacao: '',
    alimentacao: '',
    medica: '',
    descricao: ''
  };

  isModalOpen = false;
  public beneficio = {nome: ''};
  public beneficios: any [] = [];

  qualificacoes = [
    {nivel: 'Aprendiz maior de 14 anos'},
    {nivel: 'Aprendiz maior de 16 anos'},
    {nivel: 'Aprendiz maior de 18 anos'},
    {nivel: 'Ensino Médio - Cursando'},
    {nivel: 'Ensino Médio - Completo'},
    {nivel: 'Técnologo - Cursando'},
    {nivel: 'Técnologo - Completo'},
    {nivel: 'Ensino Superior - Cursando'},
    {nivel: 'Ensino Superior - Completo'},
    {nivel: 'Pós Graduação - Cursando'},
    {nivel: 'Pós Graduação - Completo'},
    {nivel: 'Mestrado - Cursando'},
    {nivel: 'Mestrado - Completo'},
    {nivel: 'Doutorado - Cursando'},
    {nivel: 'Doutorado - Completo'},
  ];

  categorias = [
    {nome: 'Administrativo'},
    {nome: 'Comércio'},
    {nome: 'Contabilidade'},
    {nome: 'Educação'},
    {nome: 'Entretenimento'},
    {nome: 'Escritório'},
    {nome: 'Farmácia'},
    {nome: 'Financeiro'},
    {nome: 'Jurídico'},
    {nome: 'Limpeza'},
    {nome: 'Linha de produção'},
    {nome: 'Restaurantes'},
    {nome: 'Recursos Humanos'},
    {nome: 'Saúde'},
    {nome: 'Serviços gerais'},
    {nome: 'Supermercado'},
    {nome: 'Tecnologia'},
  ];

  contratos = [{nome: 'CLT'}, {nome: 'PJ'}, {nome: 'Estágio'}];

  prazos = [{nome: 'Indeterminado'}, {nome: 'Temporário'}];

  inclusos = [{nome: 'Incluso'}, {nome: 'Não incluso'}];

  constructor(public nav: NavController, public mensagem: AlertController, public toast: ToastController) {}

  async addBeneficio(){
    if(this.beneficio.nome === null || this.beneficio.nome === ''){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Necessário acrescentar um título para o benefício da vaga',
          buttons: ['ok']
        }
      );
      await alerta.present();
      return;
    }else{
      const beneficioCopy = JSON.parse(JSON.stringify(this.beneficio));
      this.beneficios.push(beneficioCopy);
      this.beneficio.nome = '';
    }
  }

  async removerBenef(benef){
    const confirmaRemover = await this.mensagem.create(
      {
        header: 'ATENÇÃO',
        message: 'Confirmar exlusão de ' + benef.nome + '?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: ()=>{}
          },
          {
            text: 'Excluir',            
            handler: ()=>{
              const index = this.beneficios.indexOf(benef);
              this.beneficios.splice(index, 1);
            }
          }
        ]
      });

    await confirmaRemover.present();
  }

  combinar($event){
    if($event.currentTarget.checked){
      this.vaga.combinado = true;
    }else{
      this.vaga.combinado = false;
    }
  }

  finalizar(){
    this.nav.navigateForward('conclusao-vaga');
  }

  async abreModal(isOpen: boolean){
    if(this.vaga.tituloVaga === null || this.vaga.tituloVaga === ''){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Necessário informar o título da vaga',
          buttons: ['ok']
        }
      );
      await alerta.present();
      return;
    } else if (this.vaga.categoria === null || this.vaga.categoria === ''){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Necessário informar uma categoria',
          buttons: ['ok']
        }
      );
      await alerta.present();
      return;
    
      }else if(this.vaga.contrato === null || this.vaga.contrato === ''){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Necessário informar o tipo de contrato',
          buttons: ['ok']
        }
      );
      await alerta.present();
      return;
    }else if(this.vaga.prazo === null || this.vaga.prazo === ''){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Necessário informar o prazo de contrato',
          buttons: ['ok']
        }
      );
      await alerta.present();
      return;

    }else if(this.vaga.horario === null || this.vaga.horario === ''){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Necessário informar a carga horária',
          buttons: ['ok']
        }
      );
      await alerta.present();
      return;

    }else if(!this.vaga.combinado && this.vaga.salario === ''){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Se o salário não está a combinar, favor informar o salário',
          buttons: ['ok']
        }
      );
      await alerta.present();
      return;

    }else if(this.vaga.qualificacao === null || this.vaga.qualificacao === ''){
      
        const alerta = await this.mensagem.create(
          {
            header: 'ATENÇÃO',
            message: 'Informe uma qualificação',
            buttons: ['ok']
          }
        );
        await alerta.present();
        return;

    }else if((this.vaga.alimentacao === null || this.vaga.alimentacao === '')){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Necessário informar sobre o vale alimentação/refeição',
          buttons: ['ok']
        }
      );
      await alerta.present();
      return;

    }else if((this.vaga.medica === null || this.vaga.medica === '')){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Necessário informar sobre a assistência médica',
          buttons: ['ok']
        }
      );
      await alerta.present();
      return;

    }else if((this.vaga.descricao === null || this.vaga.descricao === '')){
      const alerta = await this.mensagem.create(
        {
          header: 'ATENÇÃO',
          message: 'Por favor informa uma descrição sobre a vaga',
          buttons: ['ok']
        }
      );
      await alerta.present();
      return;

    }else {

      this.isModalOpen = isOpen;

      if(isOpen){
        setTimeout(() => {
          this.aviso();
        }, 300);
      }
    }
  }

  async aviso(){
    const alerta = await this.mensagem.create(
      {
        header: 'REVISÃO',
        message: 'Por favor revise todos os dados inseridos antes de lançar a vaga!!! \nSe houver alguma alteração necessária, clique em cancelar no botão superior esquerdo',
        buttons: ['ok']
      });

    await alerta.present();

    return;
  }

  async lancarVaga(vaga) {
    const vagas = await this.mensagem.create({
      header: 'ATENÇÃO!',
      message:
        'Para lançar a vaga de ' + vaga.tituloVaga + ' insira seu CNPJ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Finalizar',
          handler: (cnpj) => {
            if (validarCNPJ (cnpj[0])) {
             this.exibeToast('Vaga inserida com sucesso!', 'success');
            }else{
              this.exibeToast('CNPJ inválido!', 'warning');
            }
          },
        },
      ],
      inputs: [
        {
          placeholder: 'CNPJ',
          attributes: {
            maxlenght: 18,
          },
        },
      ],
    });
    await vagas.present();
  }

  async exibeToast(msg, cor: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 1000,
      position: 'top',
      animated: true,
      color: cor,
    });

    toast.present();
  }



  ngOnInit() {
  }

}
