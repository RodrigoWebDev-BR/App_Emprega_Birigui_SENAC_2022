import { VagaAuthGuard } from './guards/vaga-auth.guard';
import { LoginAuthGuard } from './guards/login-auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'conclusao-vaga',
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
    path: 'login/:id',
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
  {
    path: 'inscricao-vaga',
    canActivate: [LoginAuthGuard],
    loadChildren: () => import('./inscricao-vaga/inscricao-vaga.module').then( m => m.InscricaoVagaPageModule)
  } ,
  {
    path: 'vaga-detalhes',
    canActivate: [LoginAuthGuard],
    loadChildren: () => import('./vaga-detalhes/vaga-detalhes.module').then( m => m.VagaDetalhesPageModule)
  },
  {
    path: 'exp-profissional',
    loadChildren: () => import('./exp-profissional/exp-profissional.module').then( m => m.ExpProfissionalPageModule)
  },
  {
    path: 'timeline-vaga',
    canActivate: [LoginAuthGuard],
    loadChildren: () => import('./timeline-vaga/timeline-vaga.module').then( m => m.TimelineVagaPageModule)
  },
  {
    path: 'home',
    canActivate: [LoginAuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'formacao-educacional',
    loadChildren: () => import('./formacao-educacional/formacao-educacional.module').then( m => m.FormacaoEducacionalPageModule)
  },
  {
    path: 'notificacao',
    canActivate: [LoginAuthGuard],
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
    canActivate: [LoginAuthGuard],
    loadChildren: () => import('./curriculo/curriculo.module').then( m => m.CurriculoPageModule)
  },
  {
    path: 'empresa',
    loadChildren: () => import('./empresa/empresa.module').then( m => m.EmpresaPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'lista-empresas',
    canActivate: [LoginAuthGuard],
    loadChildren: () => import('./lista-empresas/lista-empresas.module').then( m => m.ListaEmpresasPageModule)
  },
  {
    path: 'lista-usuarios',
    canActivate: [LoginAuthGuard],
    loadChildren: () => import('./lista-usuarios/lista-usuarios.module').then( m => m.ListaUsuariosPageModule)
  },
  {
    path: 'lancamento-vaga',
    canActivate: [LoginAuthGuard],
    loadChildren: () => import('./lancamento-vaga/lancamento-vaga.module').then( m => m.LancamentoVagaPageModule)
  },
  {
    path: 'detalhes-empresa',
    loadChildren: () => import('./detalhes-empresa/detalhes-empresa.module').then( m => m.DetalhesEmpresaPageModule)
  },
  {
    path: 'detalhes-usuario',
    loadChildren: () => import('./detalhes-usuario/detalhes-usuario.module').then( m => m.DetalhesUsuarioPageModule)
  },
  {
    path: 'candidaturas',
    canActivate: [LoginAuthGuard],
    loadChildren: () => import('./candidaturas/candidaturas.module').then( m => m.CandidaturasPageModule)
  },
  {
    path: 'conclusao-vaga',
    canActivate: [LoginAuthGuard, VagaAuthGuard],
    loadChildren: () => import('./conclusao-vaga/conclusao-vaga.module').then( m => m.ConclusaoVagaPageModule)
  },
  {
    path: 'revisao',
    loadChildren: () => import('./revisao/revisao.module').then( m => m.RevisaoPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then( m => m.ConfigPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
