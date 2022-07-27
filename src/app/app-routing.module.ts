import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'curriculo',
    pathMatch: 'full'
  }, 
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'contato',
    loadChildren: () => import('./contato/contato.module').then( m => m.ContatoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'endereco',
    loadChildren: () => import('./endereco/endereco.module').then( m => m.EnderecoPageModule)
  },
  {
    path: 'idiomas',
    loadChildren: () => import('./idiomas/idiomas.module').then( m => m.IdiomasPageModule)
  },
  { path: 'inscricao-vaga',
    loadChildren: () => import('./inscricao-vaga/inscricao-vaga.module').then( m => m.InscricaoVagaPageModule)
  } ,
  {
    path: 'vaga-detalhes',
    loadChildren: () => import('./vaga-detalhes/vaga-detalhes.module').then( m => m.VagaDetalhesPageModule)
  },
  {
    path: 'exp-profissional',
    loadChildren: () => import('./exp-profissional/exp-profissional.module').then( m => m.ExpProfissionalPageModule)
  },
  {
    path: 'timeline-vaga',
    loadChildren: () => import('./timeline-vaga/timeline-vaga.module').then( m => m.TimelineVagaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) 
  },
  {
    path: 'formacao-educacional',
    loadChildren: () => import('./formacao-educacional/formacao-educacional.module').then( m => m.FormacaoEducacionalPageModule)
  },
  {
    path: 'notificacao',
    loadChildren: () => import('./notificacao/notificacao.module').then( m => m.NotificacaoPageModule)
  },
  {
    path: 'recuperacao',
    loadChildren: () => import('./recuperacao/recuperacao.module').then( m => m.RecuperacaoPageModule)
  },
  {
    path: 'conclusao',
    loadChildren: () => import('./conclusao/conclusao.module').then( m => m.ConclusaoPageModule)
  },
  {
    path: 'curriculo',
    loadChildren: () => import('./curriculo/curriculo.module').then( m => m.CurriculoPageModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import('./empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
