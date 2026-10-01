/* Roteador da SPA baseado em hash (#/rota/ancora) */
window.ONG = window.ONG || {};

ONG.router = (function () {
  var rotas = {
    inicio: { titulo: 'Início', template: function () { return ONG.templates.inicio(); } },
    projetos: { titulo: 'Projetos', template: function () { return ONG.templates.projetos(); } },
    cadastro: { titulo: 'Seja voluntário', template: function () { return ONG.templates.cadastro(); } }
  };

  function lerHash() {
    var partes = location.hash.replace(/^#\/?/, '').split('/');
    return { rota: partes[0] || 'inicio', ancora: partes[1] || '' };
  }

  function marcarMenu(rota) {
    document.querySelectorAll('nav a[data-rota]').forEach(function (link) {
      if (link.dataset.rota === rota) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function renderizar() {
    var app = document.getElementById('app');
    var destino = lerHash();
    var config = rotas[destino.rota];

    app.innerHTML = config ? config.template() : ONG.templates.naoEncontrada();
    document.title = (config ? config.titulo : 'Página não encontrada') + ' | Mãos Solidárias';
    marcarMenu(destino.rota);
    ONG.cadastro.restaurar(app, destino.rota);
    document.getElementById('menu-toggle').checked = false;

    var alvo = destino.ancora ? document.getElementById(destino.ancora) : null;
    if (alvo) {
      alvo.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
      app.focus();
    }
    if (destino.rota === 'projetos' && !destino.ancora) {
      ONG.ui.toast('Obrigado por conhecer nossos projetos!');
    }
  }

  function iniciar() {
    var app = document.getElementById('app');
    ONG.ui.iniciarModais(app);
    ONG.cadastro.iniciarEventos(app);
    window.addEventListener('hashchange', renderizar);
    renderizar();
  }

  return { iniciar: iniciar };
})();
