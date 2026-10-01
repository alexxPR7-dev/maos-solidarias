/* Lógica do formulário de cadastro: eventos, validação, rascunho e lista salva */
window.ONG = window.ONG || {};

ONG.cadastro = (function () {
  var ID_FORM = 'form-cadastro';

  function renderizarLista() {
    var destino = document.getElementById('voluntarios-salvos');
    if (!destino) { return; }
    var lista = ONG.storage.ler(ONG.storage.CHAVE_VOLUNTARIOS, []);
    destino.innerHTML = lista.length
      ? '<ul>' + lista.map(ONG.templates.itemVoluntario).join('') + '</ul>'
      : '<p>Nenhum cadastro salvo neste navegador.</p>';
  }

  /* O CPF não é guardado no rascunho, por ser um dado sensível */
  function salvarRascunho(form) {
    var dados = Object.fromEntries(new FormData(form));
    delete dados.cpf;
    ONG.storage.salvar(ONG.storage.CHAVE_RASCUNHO, dados);
  }

  function registrarCadastro(form) {
    var d = Object.fromEntries(new FormData(form));
    var lista = ONG.storage.ler(ONG.storage.CHAVE_VOLUNTARIOS, []);
    lista.push({
      id: Date.now(),
      nome: d.nome,
      email: d.email,
      cidade: d.cidade,
      estado: d.estado,
      area: d.area,
      disponibilidade: d.disponibilidade,
      mensagem: d.mensagem,
      criadoEm: new Date().toISOString()
    });
    return ONG.storage.salvar(ONG.storage.CHAVE_VOLUNTARIOS, lista);
  }

  function ehFormularioDeCadastro(elemento) {
    return elemento.form && elemento.form.id === ID_FORM;
  }

  /* Chamada a cada renderização da rota: restaura rascunho e lista */
  function restaurar(app, rota) {
    if (rota !== 'cadastro') { return; }
    var rascunho = ONG.storage.ler(ONG.storage.CHAVE_RASCUNHO, {});
    Object.keys(rascunho).forEach(function (nome) {
      var campo = app.querySelector('[name="' + nome + '"]');
      if (campo) { campo.value = rascunho[nome]; }
    });
    renderizarLista();
  }

  /* Ouvintes delegados no #app (registrados uma única vez) */
  function iniciarEventos(app) {
    app.addEventListener('input', function (evento) {
      ONG.mascaras.aplicar(evento.target);
      if (evento.target.classList.contains('campo-erro')) {
        ONG.validacao.validarCampo(evento.target);
      }
      if (ehFormularioDeCadastro(evento.target)) { salvarRascunho(evento.target.form); }
    });

    app.addEventListener('focusout', function (evento) {
      if (ehFormularioDeCadastro(evento.target)) { ONG.validacao.validarCampo(evento.target); }
    });

    app.addEventListener('click', function (evento) {
      if (evento.target.closest('[data-limpar-voluntarios]')) {
        ONG.storage.remover(ONG.storage.CHAVE_VOLUNTARIOS);
        renderizarLista();
        ONG.ui.toast('Cadastros salvos removidos.');
      }
    });

    app.addEventListener('submit', function (evento) {
      if (evento.target.id !== ID_FORM) { return; }
      evento.preventDefault();
      if (!ONG.validacao.validarFormulario(evento.target)) {
        ONG.ui.toast('Corrija os campos destacados.');
        return;
      }
      var salvo = registrarCadastro(evento.target);
      ONG.storage.remover(ONG.storage.CHAVE_RASCUNHO);
      evento.target.reset();
      ONG.validacao.limparEstados(evento.target);
      renderizarLista();
      ONG.ui.toast(salvo ? 'Cadastro salvo com sucesso!' : 'Não foi possível salvar neste navegador.');
    });
  }

  return { iniciarEventos: iniciarEventos, restaurar: restaurar };
})();
