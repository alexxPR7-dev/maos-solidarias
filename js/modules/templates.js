/* Templates dinâmicos: funções que retornam HTML e reaproveitam componentes */
window.ONG = window.ONG || {};

ONG.templates = (function () {
  /* Evita XSS: dados digitados pelo usuário nunca entram crus no innerHTML */
  function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function itemVoluntario(v) {
    return `<li><strong>${escapar(v.nome)}</strong>: ${escapar(v.area)} (${escapar(v.cidade)}/${escapar(v.estado)})</li>`;
  }

  function badge(b) {
    return `<span class="badge badge-${b.tipo}">${b.texto}</span>`;
  }

  function cartaoProjeto(p) {
    const botao = p.detalhes
      ? `<p><button type="button" data-abrir-modal="modal-${p.id}">Saiba mais</button></p>`
      : '';
    return `<article id="${p.id}">
      <h3>${p.titulo}</h3>
      <p>${p.badges.map(badge).join(' ')}</p>
      <p>${p.descricao}</p>
      ${botao}
    </article>`;
  }

  function modalProjeto(p) {
    return `<dialog id="modal-${p.id}" aria-labelledby="titulo-${p.id}">
      <div class="modal-conteudo">
        <h2 id="titulo-${p.id}">${p.titulo}</h2>
        <p>${p.detalhes}</p>
        <p><button type="button" data-fechar-modal>Fechar</button></p>
      </div>
    </dialog>`;
  }

  function lista(tag, itens) {
    return `<${tag}>${itens.map((item) => `<li>${item}</li>`).join('')}</${tag}>`;
  }

  function inicio() {
    return '<section>' +
      '<h2>Quem somos</h2>' +
      '<img src="../imagens/voluntarios.jpg" alt="Grupo de voluntários da ONG distribuindo alimentos a famílias da comunidade" width="600" height="400">' +
      '<p>Somos uma organização do terceiro setor dedicada a apoiar famílias em situação de vulnerabilidade por meio de ações solidárias e da participação de voluntários.</p>' +
      '</section>' +
      '<section><h2>Nossa missão</h2>' +
      '<p>Promover inclusão social, acesso a direitos e melhores condições de vida para a comunidade.</p></section>' +
      '<section><h2>Contato</h2><address>' +
      '<p>E-mail: <a href="mailto:contato@maossolidarias.org">contato@maossolidarias.org</a></p>' +
      '<p>Telefone: <a href="tel:+5511999999999">(11) 99999-9999</a></p>' +
      '<p>Endereço: Rua da Esperança, 123, Centro, São Paulo - SP</p>' +
      '</address></section>';
  }

  function projetos() {
    var d = ONG.dados;
    return '<section><h2>Introdução</h2>' +
      '<p>Conheça as frentes de atuação da Mãos Solidárias e descubra como contribuir.</p></section>' +
      '<section><h2>Projetos sociais</h2>' + d.projetos.map(cartaoProjeto).join('') + '</section>' +
      '<section id="doar"><h2>Como doar</h2>' +
      '<p class="alerta alerta-info" role="note">Nossas campanhas de doação ficam abertas o ano todo.</p>' +
      '<p>Nossas campanhas de doação aceitam as seguintes formas de contribuição:</p>' +
      lista('ul', d.formasDoacao) + '</section>' +
      '<section><h2>Como ser voluntário</h2>' + lista('ol', d.passosVoluntario) +
      '<p class="alerta alerta-sucesso" role="status">Cadastros de voluntários abertos!</p>' +
      '<p><a href="#/cadastro">Quero me cadastrar</a></p></section>' +
      d.projetos.filter(function (p) { return p.detalhes; }).map(modalProjeto).join('');
  }

  function campo(id, rotulo, atributos) {
    return '<label for="' + id + '">' + rotulo + '</label>' +
      '<input id="' + id + '" name="' + id + '" ' + atributos + '>';
  }

  function cadastro() {
    var estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
    var opcoes = function (itens) {
      return '<option value="" selected disabled>Selecione</option>' +
        itens.map(function (i) { return '<option>' + i + '</option>'; }).join('');
    };
    return '<section><h2>Formulário de cadastro</h2>' +
      '<p class="alerta alerta-aviso" role="note">Todos os campos são obrigatórios, exceto a mensagem.</p>' +
      '<form id="form-cadastro" novalidate>' +
      '<fieldset><legend>Dados pessoais</legend>' +
      campo('nome', 'Nome completo', 'type="text" required') +
      campo('cpf', 'CPF', 'type="text" required inputmode="numeric" maxlength="14" placeholder="000.000.000-00" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" title="Digite o CPF no formato 000.000.000-00"') +
      campo('email', 'E-mail', 'type="email" required') +
      campo('telefone', 'Telefone', 'type="tel" required maxlength="15" placeholder="(00) 00000-0000" pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}" title="Digite o telefone no formato (00) 00000-0000"') +
      campo('nascimento', 'Data de nascimento', 'type="date" required') +
      '</fieldset>' +
      '<fieldset><legend>Endereço</legend>' +
      campo('cep', 'CEP', 'type="text" required inputmode="numeric" maxlength="9" placeholder="00000-000" pattern="\\d{5}-\\d{3}" title="Digite o CEP no formato 00000-000"') +
      campo('rua', 'Rua', 'type="text" required') +
      campo('numero', 'Número', 'type="number" min="1" required') +
      campo('cidade', 'Cidade', 'type="text" required') +
      '<label for="estado">Estado</label><select id="estado" name="estado" required>' + opcoes(estados) + '</select>' +
      '</fieldset>' +
      '<fieldset><legend>Interesse em voluntariado</legend>' +
      '<label for="area">Área de atuação</label><select id="area" name="area" required>' +
      opcoes(['Distribuição de alimentos', 'Reforço escolar', 'Arrecadação de doações']) + '</select>' +
      '<label for="disponibilidade">Disponibilidade</label><select id="disponibilidade" name="disponibilidade" required>' +
      opcoes(['Manhã', 'Tarde', 'Fins de semana']) + '</select>' +
      '<label for="mensagem">Mensagem</label><textarea id="mensagem" name="mensagem" rows="4" maxlength="500"></textarea>' +
      '</fieldset>' +
      '<button type="submit">Enviar cadastro</button>' +
      '</form></section>' +
      '<section id="voluntarios"><h2>Cadastros salvos neste navegador</h2>' +
      '<div id="voluntarios-salvos"></div>' +
      '<p><button type="button" data-limpar-voluntarios>Limpar cadastros salvos</button></p></section>';
  }

  function naoEncontrada() {
    return '<section><h2>Página não encontrada</h2>' +
      '<p class="alerta alerta-erro" role="alert">O endereço acessado não existe.</p>' +
      '<p><a href="#/inicio">Voltar ao início</a></p></section>';
  }

  return { escapar: escapar, itemVoluntario: itemVoluntario, inicio: inicio, projetos: projetos, cadastro: cadastro, naoEncontrada: naoEncontrada };
})();
