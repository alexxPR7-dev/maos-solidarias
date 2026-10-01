/* Dados da aplicação (fonte única para os templates) */
window.ONG = window.ONG || {};

ONG.dados = {
  projetos: [
    {
      id: 'alimentos',
      titulo: 'Distribuição de alimentos',
      descricao: 'Entrega mensal de cestas básicas a famílias cadastradas na comunidade.',
      detalhes: 'Entregamos cestas básicas todo mês. Para receber, a família deve estar cadastrada na nossa sede.',
      badges: [{ texto: 'Ativo', tipo: 'sucesso' }, { texto: 'Alimentação', tipo: 'info' }]
    },
    {
      id: 'reforco',
      titulo: 'Reforço escolar',
      descricao: 'Aulas gratuitas de apoio para crianças e adolescentes, conduzidas por voluntários.',
      detalhes: '',
      badges: [{ texto: 'Vagas limitadas', tipo: 'aviso' }, { texto: 'Educação', tipo: 'info' }]
    }
  ],
  formasDoacao: [
    'Pix: contato@maossolidarias.org',
    'Transferência bancária (dados sob consulta)',
    'Doação de alimentos e roupas na sede'
  ],
  passosVoluntario: [
    'Preencha o formulário de cadastro.',
    'Aguarde o contato da nossa equipe.',
    'Participe da orientação e escolha sua área de atuação.'
  ]
};
